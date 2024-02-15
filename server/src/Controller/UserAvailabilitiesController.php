<?php

namespace App\Controller;

use App\Entity\Appointment;
use App\Entity\DayOff;
use App\Entity\Schedule;
use App\Entity\Service;
use App\Entity\User;
use Carbon\Carbon;
use Carbon\CarbonInterval;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;

#[AsController]
class UserAvailabilitiesController extends AbstractController
{
  private $entityManager;

  public function __construct(EntityManagerInterface $entityManager)
  {
    $this->entityManager = $entityManager;
  }

  #[Route(
    '/api/users/{id}/availabilities/{serviceId}',
    name: 'availabilities',
    methods: [Request::METHOD_GET],
  )]
  public function __invoke(Request $request): JsonResponse
  {
    $user = $this->entityManager->getRepository(User::class)->findOneBy([
      'id' => $request->get('id'),
      'status' => 'ACTIVE'
    ]);
    $service = $this->entityManager->getRepository(Service::class)->findOneBy([
      'id' => $request->get('serviceId'),
      'status' => 'ACTIVE'
    ]);

    if (!$user || !$service) {
      return $this->json([]);
    }

    $appointments = $this->entityManager->getRepository(Appointment::class)->findBy([
      'coach' => $user->getId(),
      'status' => ['PENDING', 'APPROVED']
    ]);
    $daysOff = $this->entityManager->getRepository(DayOff::class)->findBy([
      'user' => $user->getId(),
      'status' => ['PENDING', 'APPROVED']
    ]);

    $schedulesWithPeriods = [];
    $schedules = $this->entityManager->getRepository(Schedule::class)->findBy([
      'user' => $user->getId(),
    ]);
    foreach ($schedules as $schedule) {
      $schedulesWithPeriods[] = array(
        'schedule' => $schedule,
        'periods' => $schedule->getPeriods(),
      );
    }

    $days = CarbonInterval::days(1)->toPeriod(
      Carbon::now()->addDay(),
      Carbon::now()->addDays(7)
    );

    $globalSlots = [];

    foreach ($days as $day) {
      // Remove days off from the slots
      foreach ($daysOff as $dayOff) {
        $startData = Carbon::parse($dayOff->getStartDate());
        $endData = Carbon::parse($dayOff->getEndDate());
        if ($day->between($startData, $endData->addDay())) {
          $globalSlots[] = array(
            'day' => $day,
            'slots' => [],
          );
          continue 2;
        }
      }

      // get schedule for the day
      $dayName = strtoupper($day->format('l'));
      $schedule = $schedulesWithPeriods[0];
      foreach ($schedulesWithPeriods as $s) {
        if ($s['schedule']->getDay() === $dayName) {
          $schedule = $s;
          break;
        }
      }

      // generate periods slots
      $slots = [];
      foreach ($schedule['periods'] as $period) {
        $slots[] = CarbonInterval::minutes(15)->toPeriod(
          Carbon::parse($day->setTimeFromTimeString($period->getStartTime())),
          Carbon::parse($day->setTimeFromTimeString($period->getEndTime())
            ->subMinutes($service->getDuration()))
        );
      }

      // filter slots with appointments
      $newSlots = [];
      foreach ($slots as $slotGroup) {
        foreach ($slotGroup as $slot) {
          foreach ($appointments as $appointment) {
            if ($day->format('Y-m-d') === $appointment->getDate()->format('Y-m-d')) {
              $startDate = Carbon::parse($day->setTimeFromTimeString($appointment->getStartTime()));
              $endDate = Carbon::parse($day->setTimeFromTimeString($appointment->getEndTime()));
              if (!$slot->between($startDate, $endDate->addMinutes($service->getDuration()))) {
                $newSlots[] = array(
                  'startTime' => $slot->format('H:i'),
                  'endTime' => $slot->addMinutes($service->getDuration())->format('H:i'),
                );
              }
            } else {
              $newSlots[] = array(
                'startTime' => $slot->format('H:i'),
                'endTime' => $slot->addMinutes($service->getDuration())->format('H:i'),
              );
            }
          }
        }
      }

      $globalSlots[] = array(
        'day' => $day,
        'slots' => $newSlots,
      );
    }

    return $this->json($globalSlots);
  }
}
