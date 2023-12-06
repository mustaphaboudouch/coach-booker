<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserServiceRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserServiceRepository::class)]
#[ApiResource]
class UserService
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'user_services_ids')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Coach $coach_id = null;

    #[ORM\ManyToOne(inversedBy: 'user_services_ids')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Service $service_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCoachId(): ?Coach
    {
        return $this->coach_id;
    }

    public function setCoachId(?Coach $coach_id): static
    {
        $this->coach_id = $coach_id;

        return $this;
    }

    public function getServiceId(): ?Service
    {
        return $this->service_id;
    }

    public function setServiceId(?Service $service_id): static
    {
        $this->service_id = $service_id;

        return $this;
    }
}
