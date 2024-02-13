<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
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
    normalizationContext: ['groups' => ['appointment:read']],
    operations: [
        new Get(),
        new Post(
            denormalizationContext: ['groups' => 'appointment:create'],
            normalizationContext: ['groups' => 'appointment:response'],
        ),
        new Patch(
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_USER') and object.getUser().getId() == user.getId())
            ",
            securityMessage: "Operation not permitted",
            inputFormats: ["json"],
            denormalizationContext: ['groups' => 'slot:update'],
            normalizationContext: ['groups' => 'slot:response'],
        ),
        new Delete(
            security: "
                is_granted('ROLE_ADMIN') 
                or (is_granted('ROLE_EMPLOYEE') and object.getService().getEmployee().getId() == user.getId())
                or (is_granted('ROLE_USER') and object.getUser().getId() == user.getId())
            ",
            securityMessage: "Operation not permitted",
        )
    ]
)]
class Appointment
{
    use TimestampableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['appointment:read'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['organisation:read', 'user:read'])]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    #[Groups(['organisation:read', 'user:read'])]
    private ?\DateTimeInterface $start_time = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    #[Assert\GreaterThan(propertyPath: 'start_time')]
    #[Groups(['organisation:read', 'user:read'])]
    private ?\DateTimeInterface $end_time = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Choice(choices: ['PENDING', 'ACCEPTED', 'REJECTED', 'CANCELED', 'DONE_WITHOUT_FEEDBACK', 'DONE'])]
    #[Groups(['organisation:read', 'user:read'])]
    private ?string $status = "PENDING";

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['organisation:read', 'user:read'])]
    private ?string $reject_reason = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['organisation:read', 'user:read'])]
    private ?string $cancel_reason = null;

    #[ORM\ManyToOne(inversedBy: 'coachAppointments')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['user:read'])]
    private ?User $coach = null;

    #[ORM\ManyToOne(inversedBy: 'clientAppointments')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['organisation:read', 'user:read'])]
    private ?User $client = null;

    #[ORM\ManyToOne(inversedBy: 'appointments')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['organisation:read', 'user:read'])]
    private ?Service $service = null;

    #[ORM\OneToMany(mappedBy: 'appointment', targetEntity: Feedback::class, orphanRemoval: true)]
    #[Groups(['organisation:read', 'user:read'])]
    private Collection $feedbacks;

    public function __construct()
    {
        $this->feedbacks = new ArrayCollection();
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
