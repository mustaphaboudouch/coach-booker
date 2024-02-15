<?php

namespace App\Controller;

use App\Entity\Appointment;
use App\Entity\Location;
use App\Entity\Organisation;
use App\Entity\Service;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardStatisticController extends AbstractController
{
    #[Route('/dashboard/{userId}/statistic', name: 'app_dashboard_statistic')]
    public function index(): Response
    {
        return $this->render('dashboard_statistic/index.html.twig', [
            'controller_name' => 'DashboardStatisticController',
        ]);
    }

    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/users/{id}/dashboard-statistic", name="user_dashboard_statistic", methods={"GET"})
     */
    public function __invoke(Request $request, int $id): JsonResponse
    {
        $user = $this->entityManager->getRepository(User::class)->findOneBy([
            'id' => $request->get('id'),
            'status' => 'ACTIVE',
        ]);

        if (!$user) {
            return new JsonResponse(['error' => 'User not found'], Response::HTTP_NOT_FOUND);
        }

        if (in_array('ROLE_ORG_ADMIN', $user->getRoles())) {
            return $this->getOrgAdminStatistic($user);
        }

        if (in_array('ROLE_COACH', $user->getRoles())) {
            return $this->getCoachStatistic($user);
        }

        if (in_array('ROLE_ADMIN', $user->getRoles())) {
            return $this->getAdminStatistic($user);
        }

        return new JsonResponse(['error' => 'User role not found'], Response::HTTP_NOT_FOUND);
    }


    private function getOrgAdminStatistic($user)
    {

        $locationNumber = $this->entityManager->getRepository(Location::class)->count([
            'status' => 'ACTIVE',
            'organisation' => $user->getOrganisation(),
        ]);

        $coachNumber = $this->entityManager->getRepository(User::class)->count([
            'status' => 'ACTIVE',
            'organisation' => $user->getOrganisation(),
            'roles' => 'ROLE_COACH',
        ]);

        $serviceNumber = $this->entityManager->getRepository(Service::class)->count([
            'status' => 'ACTIVE',
            'organisation' => $user->getOrganisation(),
        ]);

        $coachStatistic = array(
            'locationNumber' => $locationNumber,
            'coachNumber' => $coachNumber,
            'serviceNumber' => $serviceNumber,
        );

        return $this->json($coachStatistic);
    }

    private function getCoachStatistic($user)
    {
        $appointmentNumber = $this->entityManager->getRepository(Appointment::class)->count([
            'status' => 'ACTIVE',
            'coach' => $user,
        ]);

        $clientNumber = $this->entityManager->getRepository(User::class)->count([
            'status' => 'ACTIVE',
            'coach' => $user,
            'roles' => 'ROLE_CLIENT',
        ]);

        $coachStatistic = array(
            'appointmentNumber' => $appointmentNumber,
            'clientNumber' => $clientNumber,
        );

        return $this->json($coachStatistic);
    }

    private function getAdminStatistic($user)
    {
        $organisationNumber = $this->entityManager->getRepository(Organisation::class)->count([
            'status' => 'ACTIVE',
        ]);

        $coachNumber = $this->entityManager->getRepository(User::class)->count([
            'status' => 'ACTIVE',
            'roles' => 'ROLE_COACH',
        ]);

        $clientNumber = $this->entityManager->getRepository(User::class)->count([
            'status' => 'ACTIVE',
            'roles' => 'ROLE_CLIENT',
        ]);

        $adminStatistic = array(
            'organisationNumber' => $organisationNumber,
            'coachNumber' => $coachNumber,
            'clientNumber' => $clientNumber,
        );

        return $this->json($adminStatistic);
    }
}
