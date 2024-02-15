<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

#[AsController]
class LoggedUserController extends AbstractController
{
  private TokenStorageInterface $tokenStorage;

  public function __construct(TokenStorageInterface $tokenStorage)
  {
    $this->tokenStorage = $tokenStorage;
  }

  #[Route(
    '/api/me',
    name: 'me',
    methods: [Request::METHOD_GET],
  )]
  public function __invoke(): ?JsonResponse
  {
    $token = $this->tokenStorage->getToken();

    if (!$token) {
      return null;
    }

    $user = $token->getUser();

    if (!$user instanceof User) {
      return null;
    }

    if ($user->getOrganisation() === null) {
      return $this->json(array(
        'id' => $user->getId(),
        'firstname' => $user->getFirstname(),
        'lastname' => $user->getLastname(),
        'roles' => $user->getRoles(),
      ));
    }

    return $this->json(array(
      'id' => $user->getId(),
      'firstname' => $user->getFirstname(),
      'lastname' => $user->getLastname(),
      'roles' => $user->getRoles(),
      'organisation' => array(
        'id' => $user->getOrganisation()->getId(),
        'name' => $user->getOrganisation()->getName(),
      )
    ));
  }
}
