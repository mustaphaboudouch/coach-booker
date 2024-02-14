<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\AppointmentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: AppointmentRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['appointment:get:collection']]
        ),
        new Get(
            normalizationContext: ['groups' => ['appointment:get']]
        ),
        new Post(
            denormalizationContext: ['groups' => ['appointment:post']]
        ),
        new Patch(
            denormalizationContext: ['groups' => ['appointment:patch']]
        ),
    ],
)]
class Appointment
{
    use TimestampableEntity;

    #[Groups(['appointment:get:collection', 'appointment:get'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['appointment:get:collection', 'appointment:get', 'appointment:post', 'appointment:patch'])]
    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $date = null;

    #[Groups(['appointment:get:collection', 'appointment:get', 'appointment:post', 'appointment:patch'])]
    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $startTime = null;

    #[Groups(['appointment:get:collection', 'appointment:get', 'appointment:post', 'appointment:patch'])]
    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $endTime = null;

    #[Groups(['appointment:get:collection', 'appointment:get', 'appointment:patch'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Choice(choices: ['PENDING', 'APPROVED', 'REJECTED', 'CANCELED', 'DONE_WITHOUT_FEEDBACK', 'DONE'])]
    private ?string $status = null;

    #[Groups(['appointment:get', 'appointment:patch'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $rejectReason = null;

    #[Groups(['appointment:get', 'appointment:patch'])]
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $cancelReason = null;

    #[Groups(['appointment:get', 'appointment:post'])]
    #[ORM\ManyToOne(inversedBy: 'coachAppointments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $coach = null;

    #[Groups(['appointment:get', 'appointment:post'])]
    #[ORM\ManyToOne(inversedBy: 'clientAppointments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $client = null;

    #[Groups(['appointment:get:collection', 'appointment:get', 'appointment:post'])]
    #[ORM\ManyToOne(inversedBy: 'appointments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Service $service = null;

    #[Groups(['appointment:get', 'appointment:post'])]
    #[ORM\ManyToOne(inversedBy: 'appointments')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Location $location = null;

    #[ORM\OneToMany(mappedBy: 'appointment', targetEntity: Feedback::class, orphanRemoval: true)]
    private Collection $feedbacks;

    public function __construct()
    {
        $this->feedbacks = new ArrayCollection();
        $this->status = 'PENDING';
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
        return $this->startTime;
    }

    public function setStartTime(\DateTimeInterface $startTime): static
    {
        $this->startTime = $startTime;

        return $this;
    }

    public function getEndTime(): ?\DateTimeInterface
    {
        return $this->endTime;
    }

    public function setEndTime(\DateTimeInterface $endTime): static
    {
        $this->endTime = $endTime;

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
        return $this->rejectReason;
    }

    public function setRejectReason(?string $rejectReason): static
    {
        $this->rejectReason = $rejectReason;

        return $this;
    }

    public function getCancelReason(): ?string
    {
        return $this->cancelReason;
    }

    public function setCancelReason(?string $cancelReason): static
    {
        $this->cancelReason = $cancelReason;

        return $this;
    }

    public function getCoach(): ?User
    {
        return $this->coach;
    }

    public function setCoach(?User $coach): static
    {
        $this->coach = $coach;

        return $this;
    }

    public function getClient(): ?User
    {
        return $this->client;
    }

    public function setClient(?User $client): static
    {
        $this->client = $client;

        return $this;
    }

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): static
    {
        $this->service = $service;

        return $this;
    }

    public function getLocation(): ?Location
    {
        return $this->location;
    }

    public function setLocation(?Location $location): static
    {
        $this->location = $location;

        return $this;
    }

    /**
     * @return Collection<int, Feedback>
     */
    public function getFeedbacks(): Collection
    {
        return $this->feedbacks;
    }

    public function addFeedback(Feedback $feedback): static
    {
        if (!$this->feedbacks->contains($feedback)) {
            $this->feedbacks->add($feedback);
            $feedback->setAppointment($this);
        }

        return $this;
    }

    public function removeFeedback(Feedback $feedback): static
    {
        if ($this->feedbacks->removeElement($feedback)) {
            // set the owning side to null (unless already changed)
            if ($feedback->getAppointment() === $this) {
                $feedback->setAppointment(null);
            }
        }

        return $this;
    }
}
