<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use App\Repository\UserRepository;
use App\State\PasswordHasher;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    denormalizationContext: ['groups' => ['user:create']],
    normalizationContext: ['groups' => ['user:read']],
    operations: [
        new Post(processor: PasswordHasher::class),
        new Get(
            security: "is_granted('ROLE_ADMIN')
                or (is_granted('ROLE_ORG_ADMIN') and object.getOrganisation() == user.getOrganisation())
                or (is_granted('ROLE_USER') and object.getId() == user.getId())
            ",
        ),
        new GetCollection(
            security: "is_granted('ROLE_ADMIN')
                or (is_granted('ROLE_ORG_ADMIN') and object.getOrganisation() == user.getOrganisation())",
        ),
        new Patch(
            processor: PasswordHasher::class,
            security: "is_granted('ROLE_ADMIN') or (is_granted('ROLE_USER') and object.getId() == user.getId())
            or (is_granted('ROLE_ORG_ADMIN') and object.getOrganisation() == user.getOrganisation())",
            securityMessage: "Operation not permitted",
            denormalizationContext: ['groups' => 'user:update'],
        ),
        new Patch(
            processor: PasswordHasher::class,
            security: "is_granted('ROLE_ADMIN')",
            securityMessage: "Operation not permitted",
            denormalizationContext: ['groups' => 'user:update:admin'],
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN') or (is_granted('ROLE_ORG_ADMIN') and object.getOrganisation() == user.getOrganisation())",
            securityMessage: "Operation not permitted",
        )
    ],
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    use TimestampableEntity;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:create', 'user:read', 'user:update'])]
    #[Assert\NotBlank]
    private ?string $firstname = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:create', 'user:read', 'user:update'])]
    #[Assert\NotBlank]
    private ?string $lastname = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(['user:create', 'user:read', 'user:update'])]
    #[Assert\NotBlank]
    private ?string $email = null;

    #[ORM\Column]
    #[Groups(['user:create', 'user:read', 'user:update:admin'])]
    private array $roles = [];

    #[ORM\Column]
    private ?string $password = null;

    #[Groups(['user:create', 'user:update'])]
    private ?string $plainPassword = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Assert\Regex(
        pattern: '/^0[1-9]\d{8}$/',
        message: 'The phone number must be a 10 digit number starting with 0'
    )]
    #[Groups(['user:create', 'user:read', 'user:update'])]
    private ?string $phone_number = null;

    #[ORM\OneToOne(inversedBy: 'user', cascade: ['persist', 'remove'])]
    #[Groups(['user:create', 'user:read', 'user:update'])]
    private ?Address $address = null;

    #[ORM\ManyToOne(inversedBy: 'users')]
    #[Groups(['user:create', 'user:read', 'user:update'])]
    private ?Organisation $organisation = null;

    #[ORM\OneToOne(mappedBy: 'user', cascade: ['persist', 'remove'])]
    #[Groups(['user:create', 'user:read', 'user:update'])]
    private ?Schedule $schedule = null;

    #[Groups(['user:create', 'user:read', 'user:update'])]
    #[ORM\OneToMany(mappedBy: 'user', targetEntity: DayOff::class, orphanRemoval: true)]
    private Collection $daysOff;

    #[Groups(['user:create', 'user:read', 'user:update'])]
    #[ORM\OneToMany(mappedBy: 'coach', targetEntity: Appointment::class, orphanRemoval: true)]
    private Collection $coachAppointments;

    #[Groups(['user:create', 'user:read', 'user:update'])]
    #[ORM\OneToMany(mappedBy: 'client', targetEntity: Appointment::class, orphanRemoval: true)]
    private Collection $clientAppointments;

    #[Groups(['user:create', 'user:read', 'user:update'])]
    #[ORM\OneToMany(mappedBy: 'coach', targetEntity: Feedback::class, orphanRemoval: true)]
    private Collection $coachFeedbacks;

    #[Groups(['user:create', 'user:read'])]
    #[ORM\OneToMany(mappedBy: 'client', targetEntity: Feedback::class, orphanRemoval: true)]
    private Collection $clientFeedbacks;

    public function __construct()
    {
        $this->daysOff = new ArrayCollection();
        $this->coachAppointments = new ArrayCollection();
        $this->clientAppointments = new ArrayCollection();
        $this->coachFeedbacks = new ArrayCollection();
        $this->clientFeedbacks = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;
        $roles[] = 'ROLE_USER'; // guarantee every user at least has ROLE_USER

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): self
    {
        $this->plainPassword = $plainPassword;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phone_number;
    }

    public function setPhoneNumber(?string $phone_number): static
    {
        $this->phone_number = $phone_number;

        return $this;
    }

    public function getAddress(): ?Address
    {
        return $this->address;
    }

    public function setAddress(?Address $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getOrganisation(): ?Organisation
    {
        return $this->organisation;
    }

    public function setOrganisation(?Organisation $organisation): static
    {
        $this->organisation = $organisation;

        return $this;
    }

    public function getSchedule(): ?Schedule
    {
        return $this->schedule;
    }

    public function setSchedule(Schedule $schedule): static
    {
        // set the owning side of the relation if necessary
        if ($schedule->getUser() !== $this) {
            $schedule->setUser($this);
        }

        $this->schedule = $schedule;

        return $this;
    }

    /**
     * @return Collection<int, DayOff>
     */
    public function getDaysOff(): Collection
    {
        return $this->daysOff;
    }

    public function addDaysOff(DayOff $daysOff): static
    {
        if (!$this->daysOff->contains($daysOff)) {
            $this->daysOff->add($daysOff);
            $daysOff->setUser($this);
        }

        return $this;
    }

    public function removeDaysOff(DayOff $daysOff): static
    {
        if ($this->daysOff->removeElement($daysOff)) {
            // set the owning side to null (unless already changed)
            if ($daysOff->getUser() === $this) {
                $daysOff->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Appointment>
     */
    public function getCoachAppointments(): Collection
    {
        return $this->coachAppointments;
    }

    public function addCoachAppointment(Appointment $coachAppointment): static
    {
        if (!$this->coachAppointments->contains($coachAppointment)) {
            $this->coachAppointments->add($coachAppointment);
            $coachAppointment->setCoach($this);
        }

        return $this;
    }

    public function removeCoachAppointment(Appointment $coachAppointment): static
    {
        if ($this->coachAppointments->removeElement($coachAppointment)) {
            // set the owning side to null (unless already changed)
            if ($coachAppointment->getCoach() === $this) {
                $coachAppointment->setCoach(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Appointment>
     */
    public function getClientAppointments(): Collection
    {
        return $this->clientAppointments;
    }

    public function addClientAppointment(Appointment $clientAppointment): static
    {
        if (!$this->clientAppointments->contains($clientAppointment)) {
            $this->clientAppointments->add($clientAppointment);
            $clientAppointment->setClient($this);
        }

        return $this;
    }

    public function removeClientAppointment(Appointment $clientAppointment): static
    {
        if ($this->clientAppointments->removeElement($clientAppointment)) {
            // set the owning side to null (unless already changed)
            if ($clientAppointment->getClient() === $this) {
                $clientAppointment->setClient(null);
            }
        }

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

    /**
     * @return Collection<int, Feedback>
     */
    public function getCoachFeedbacks(): Collection
    {
        return $this->coachFeedbacks;
    }

    public function addCoachFeedback(Feedback $coachFeedback): static
    {
        if (!$this->coachFeedbacks->contains($coachFeedback)) {
            $this->coachFeedbacks->add($coachFeedback);
            $coachFeedback->setCoach($this);
        }

        return $this;
    }

    public function removeCoachFeedback(Feedback $coachFeedback): static
    {
        if ($this->coachFeedbacks->removeElement($coachFeedback)) {
            // set the owning side to null (unless already changed)
            if ($coachFeedback->getCoach() === $this) {
                $coachFeedback->setCoach(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Feedback>
     */
    public function getClientFeedbacks(): Collection
    {
        return $this->clientFeedbacks;
    }

    public function addClientFeedback(Feedback $clientFeedback): static
    {
        if (!$this->clientFeedbacks->contains($clientFeedback)) {
            $this->clientFeedbacks->add($clientFeedback);
            $clientFeedback->setClient($this);
        }

        return $this;
    }

    public function removeClientFeedback(Feedback $clientFeedback): static
    {
        if ($this->clientFeedbacks->removeElement($clientFeedback)) {
            // set the owning side to null (unless already changed)
            if ($clientFeedback->getClient() === $this) {
                $clientFeedback->setClient(null);
            }
        }

        return $this;
    }
}
