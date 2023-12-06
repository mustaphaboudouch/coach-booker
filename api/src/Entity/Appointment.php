<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\AppointmentRepository;
use App\Entity\Traits\TimestampableTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AppointmentRepository::class)]
#[ApiResource]
class Appointment
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $start_time = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $end_time = null;

    #[ORM\Column(length: 255)]
    private ?string $status = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $reject_reason = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $cancel_reason = null;

    #[ORM\ManyToOne(inversedBy: 'appointments_ids')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Client $client_id = null;

    #[ORM\ManyToOne(inversedBy: 'appointments_ids')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Coach $coach_id = null;

    #[ORM\ManyToOne(inversedBy: 'appointments_ids')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Service $service_id = null;

    #[ORM\OneToMany(mappedBy: 'appointment_id', targetEntity: Feedback::class)]
    private Collection $feedbacks_ids;

    public function __construct()
    {
        $this->feedbacks_ids = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;

        return $this;
    }

    public function getStartTime(): ?\DateTimeInterface
    {
        return $this->start_time;
    }

    public function setStartTime(\DateTimeInterface $start_time): static
    {
        $this->start_time = $start_time;

        return $this;
    }

    public function getEndTime(): ?\DateTimeInterface
    {
        return $this->end_time;
    }

    public function setEndTime(\DateTimeInterface $end_time): static
    {
        $this->end_time = $end_time;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;

        return $this;
    }

    public function getRejectReason(): ?string
    {
        return $this->reject_reason;
    }

    public function setRejectReason(?string $reject_reason): static
    {
        $this->reject_reason = $reject_reason;

        return $this;
    }

    public function getCancelReason(): ?string
    {
        return $this->cancel_reason;
    }

    public function setCancelReason(?string $cancel_reason): static
    {
        $this->cancel_reason = $cancel_reason;

        return $this;
    }

    public function getClientId(): ?Client
    {
        return $this->client_id;
    }

    public function setClientId(?Client $client_id): static
    {
        $this->client_id = $client_id;

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

    public function getServiceId(): ?Service
    {
        return $this->service_id;
    }

    public function setServiceId(?Service $service_id): static
    {
        $this->service_id = $service_id;

        return $this;
    }

    /**
     * @return Collection<int, Feedback>
     */
    public function getFeedbacksIds(): Collection
    {
        return $this->feedbacks_ids;
    }

    public function addFeedbacksId(Feedback $feedbacksId): static
    {
        if (!$this->feedbacks_ids->contains($feedbacksId)) {
            $this->feedbacks_ids->add($feedbacksId);
            $feedbacksId->setAppointmentId($this);
        }

        return $this;
    }

    public function removeFeedbacksId(Feedback $feedbacksId): static
    {
        if ($this->feedbacks_ids->removeElement($feedbacksId)) {
            // set the owning side to null (unless already changed)
            if ($feedbacksId->getAppointmentId() === $this) {
                $feedbacksId->setAppointmentId(null);
            }
        }

        return $this;
    }
}
