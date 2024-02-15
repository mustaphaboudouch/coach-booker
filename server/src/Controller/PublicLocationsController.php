<?php

namespace App\Controller;

use App\Entity\Appointment;
use App\Entity\DayOff;
use App\Entity\Location;
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
class PublicLocationsController extends AbstractController
{
  private $entityManager;

  public function __construct(EntityManagerInterface $entityManager)
  {
    $this->entityManager = $entityManager;
  }

  #[Route(
    '/api/locations/{search}/{address}/{sort}',
    name: 'public-locations',
    methods: [Request::METHOD_GET],
  )]
  public function __invoke(Request $request): JsonResponse
  {
    $url = "https://maps.googleapis.com/maps/api/geocode/json?address=" . urlencode($request->get('address')) . "&key=AIzaSyCiCpE2tG1KUk2Cx50tUG10EffjhsifFqQ";
    $response = file_get_contents($url);
    $data = json_decode($response);

    $latitude = is_numeric($data->results[0]->geometry->location->lat) ? $data->results[0]->geometry->location->lat : 48.864716;
    $longitude = is_numeric($data->results[0]->geometry->location->lng) ? $data->results[0]->geometry->location->lng : 2.349014;

    return $this->json(array(
      'search' => $request->get('search'),
      'address' => $request->get('address'),
      'sort' => $request->get('sort'),
      'data' => array(
        'lat' => $latitude,
        'lng' => $longitude
      )
    ));
  }
}
