<?php

namespace App\Entity;

use App\Repository\UserRepository;
use App\Entity\Traits\TimestampableTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    private ?string $lastname = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $profile_photo = null;

    #[ORM\OneToOne(mappedBy: 'user_id', cascade: ['persist', 'remove'])]
    private ?Coach $coach_id = null;

    #[ORM\OneToOne(mappedBy: 'user_id', cascade: ['persist', 'remove'])]
    private ?Client $client_id = null;

    #[ORM\OneToMany(mappedBy: 'from_user_id', targetEntity: Feedback::class)]
    private Collection $feedback_id;

    #[ORM\OneToMany(mappedBy: 'to_user_id', targetEntity: Feedback::class)]
    private Collection $feedbacks_received_ids;

    public function __construct()
    {
        $this->feedback_id = new ArrayCollection();
        $this->feedbacks_received_ids = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getProfilePhoto(): ?string
    {
        return $this->profile_photo;
    }

    public function setProfilePhoto(?string $profile_photo): static
    {
        $this->profile_photo = $profile_photo;

        return $this;
    }

    public function getCoachId(): ?Coach
    {
        return $this->coach_id;
    }

    public function setCoachId(Coach $coach_id): static
    {
        // set the owning side of the relation if necessary
        if ($coach_id->getUserId() !== $this) {
            $coach_id->setUserId($this);
        }

        $this->coach_id = $coach_id;

        return $this;
    }

    public function getClientId(): ?Client
    {
        return $this->client_id;
    }

    public function setClientId(Client $client_id): static
    {
        // set the owning side of the relation if necessary
        if ($client_id->getUserId() !== $this) {
            $client_id->setUserId($this);
        }

        $this->client_id = $client_id;

        return $this;
    }

    /**
     * @return Collection<int, Feedback>
     */
    public function getFeedbackId(): Collection
    {
        return $this->feedback_id;
    }

    public function addFeedbackId(Feedback $feedbackId): static
    {
        if (!$this->feedback_id->contains($feedbackId)) {
            $this->feedback_id->add($feedbackId);
            $feedbackId->setFromUserId($this);
        }

        return $this;
    }

    public function removeFeedbackId(Feedback $feedbackId): static
    {
        if ($this->feedback_id->removeElement($feedbackId)) {
            // set the owning side to null (unless already changed)
            if ($feedbackId->getFromUserId() === $this) {
                $feedbackId->setFromUserId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Feedback>
     */
    public function getFeedbacksReceivedIds(): Collection
    {
        return $this->feedbacks_received_ids;
    }

    public function addFeedbacksReceivedId(Feedback $feedbacksReceivedId): static
    {
        if (!$this->feedbacks_received_ids->contains($feedbacksReceivedId)) {
            $this->feedbacks_received_ids->add($feedbacksReceivedId);
            $feedbacksReceivedId->setToUserId($this);
        }

        return $this;
    }

    public function removeFeedbacksReceivedId(Feedback $feedbacksReceivedId): static
    {
        if ($this->feedbacks_received_ids->removeElement($feedbacksReceivedId)) {
            // set the owning side to null (unless already changed)
            if ($feedbacksReceivedId->getToUserId() === $this) {
                $feedbacksReceivedId->setToUserId(null);
            }
        }

        return $this;
    }
}
