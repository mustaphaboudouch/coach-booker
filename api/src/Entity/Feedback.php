<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\FeedbackRepository;
use App\Entity\Traits\TimestampableTrait;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FeedbackRepository::class)]
#[ApiResource]
class Feedback
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $comment = null;

    #[ORM\ManyToOne(inversedBy: 'feedback_id')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $from_user_id = null;

    #[ORM\ManyToOne(inversedBy: 'feedbacks_received_ids')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $to_user_id = null;

    #[ORM\ManyToOne(inversedBy: 'feedbacks_ids')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Appointment $appointment_id = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(string $comment): static
    {
        $this->comment = $comment;

        return $this;
    }

    public function getFromUserId(): ?User
    {
        return $this->from_user_id;
    }

    public function setFromUserId(?User $from_user_id): static
    {
        $this->from_user_id = $from_user_id;

        return $this;
    }

    public function getToUserId(): ?User
    {
        return $this->to_user_id;
    }

    public function setToUserId(?User $to_user_id): static
    {
        $this->to_user_id = $to_user_id;

        return $this;
    }

    public function getAppointmentId(): ?Appointment
    {
        return $this->appointment_id;
    }

    public function setAppointmentId(?Appointment $appointment_id): static
    {
        $this->appointment_id = $appointment_id;

        return $this;
    }
}
