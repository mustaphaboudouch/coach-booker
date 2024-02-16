<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserLocationRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserLocationRepository::class)]
#[ApiResource]
class UserLocation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'user_locations_ids')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Coach $coach_id = null;

    #[ORM\ManyToOne(inversedBy: 'user_locations_ids')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Location $location_id = null;

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

    public function getLocationId(): ?Location
    {
        return $this->location_id;
    }

    public function setLocationId(?Location $location_id): static
    {
        $this->location_id = $location_id;

        return $this;
    }
}
