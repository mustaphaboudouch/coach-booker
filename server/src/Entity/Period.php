<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use App\Repository\PeriodRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: PeriodRepository::class)]
#[ApiResource]
class Period
{
    #[Groups(['user:get'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['user:get', 'user:patch:schedule:update'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private ?string $startTime = null;

    #[Groups(['user:get', 'user:patch:schedule:update'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private ?string $endTime = null;

    #[ORM\ManyToOne(inversedBy: 'periods')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Schedule $schedule = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartTime(): ?string
    {
        return $this->startTime;
    }

    public function setStartTime(string $startTime): static
    {
        $this->startTime = $startTime;

        return $this;
    }

    public function getEndTime(): ?string
    {
        return $this->endTime;
    }

    public function setEndTime(string $endTime): static
    {
        $this->endTime = $endTime;

        return $this;
    }

    public function getSchedule(): ?Schedule
    {
        return $this->schedule;
    }

    public function setSchedule(?Schedule $schedule): static
    {
        $this->schedule = $schedule;

        return $this;
    }
}
