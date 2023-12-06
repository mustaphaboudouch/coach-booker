<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ScheduleRepository;
use App\Entity\Traits\TimestampableTrait;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ScheduleRepository::class)]
#[ApiResource]
class Schedule
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private array $planning = [];

    #[ORM\ManyToOne(inversedBy: 'schedules_ids')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Coach $coach_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlanning(): array
    {
        return $this->planning;
    }

    public function setPlanning(array $planning): static
    {
        $this->planning = $planning;

        return $this;
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
}
