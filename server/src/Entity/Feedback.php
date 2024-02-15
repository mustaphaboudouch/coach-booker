<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use App\Repository\FeedbackRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: FeedbackRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(),
        new Post(),
    ],
)]
class Feedback
{
    use TimestampableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Assert\NotBlank]
    private ?string $comment = null;

    #[ORM\Column]
    #[Assert\Range(min: 1, max: 5)]
    private ?int $rating_expertise = null;

    #[ORM\Column]
    #[Assert\Range(min: 1, max: 5)]
    private ?int $rating_availability = null;

    #[ORM\Column]
    #[Assert\Range(min: 1, max: 5)]
    private ?int $rating_communication = null;

    #[ORM\Column]
    #[Assert\Range(min: 1, max: 5)]
    private ?int $rating_experience = null;

    #[ORM\Column]
    #[Assert\Range(min: 1, max: 5)]
    private ?int $rating_motivation = null;

    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Choice(choices: ['ACTIVE', 'DELETED'])]
    private ?string $status = null;

    #[ORM\ManyToOne(inversedBy: 'feedbacks')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Appointment $appointment = null;

    public function __construct()
    {
        $this->status = 'ACTIVE';
    }

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

    public function getRatingExpertise(): ?int
    {
        return $this->rating_expertise;
    }

    public function setRatingExpertise(int $rating_expertise): static
    {
        $this->rating_expertise = $rating_expertise;

        return $this;
    }

    public function getRatingAvailability(): ?int
    {
        return $this->rating_availability;
    }

    public function setRatingAvailability(int $rating_availability): static
    {
        $this->rating_availability = $rating_availability;

        return $this;
    }

    public function getRatingCommunication(): ?int
    {
        return $this->rating_communication;
    }

    public function setRatingCommunication(int $rating_communication): static
    {
        $this->rating_communication = $rating_communication;

        return $this;
    }

    public function getRatingExperience(): ?int
    {
        return $this->rating_experience;
    }

    public function setRatingExperience(int $rating_experience): static
    {
        $this->rating_experience = $rating_experience;

        return $this;
    }

    public function getRatingMotivation(): ?int
    {
        return $this->rating_motivation;
    }

    public function setRatingMotivation(int $rating_motivation): static
    {
        $this->rating_motivation = $rating_motivation;

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

    public function getAppointment(): ?Appointment
    {
        return $this->appointment;
    }

    public function setAppointment(?Appointment $appointment): static
    {
        $this->appointment = $appointment;

        return $this;
    }
}
