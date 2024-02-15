<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Controller\DashboardStatisticController;
use App\Controller\UserUploadImageController;
use App\Repository\UserRepository;
use App\State\PasswordHasher;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[Vich\Uploadable]
#[ORM\Table(name: "users")]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['user:get:collection']],
        ),
        new GetCollection(
            uriTemplate: '/users-basic',
            normalizationContext: ['groups' => ['user:get:collection:basic']],
        ),
        new Get(
            normalizationContext: ['groups' => ['user:get']],
        ),
        new Get(
            uriTemplate: '/users/{id}/dashboard-statistic',
            controller: DashboardStatisticController::class,
            denormalizationContext: ['groups' => ['user:statistic']],
        ),
        new Post(
            processor: PasswordHasher::class,
            denormalizationContext: ['groups' => ['user:post']],
        ),
        new Patch(
            denormalizationContext: ['groups' => ['user:patch']],
        ),
        new Patch(
            uriTemplate: '/users/{id}/schedule-update',
            denormalizationContext: ['groups' => ['user:patch:schedule:update']],
        ),
        new Post(
            uriTemplate: '/users/{id}/upload-image',
            controller: UserUploadImageController::class,
            denormalizationContext: ['groups' => ['user:upload:image']],
            defaults: ['_api_receive' => false], // Prevent API Platform from trying to deserialize the request body
            name: 'user_upload_image',
        ),
    ],
)]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    use TimestampableEntity;

    #[Groups(['user:get:collection', 'user:get:collection:basic', 'user:get', 'location:get:collection'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['user:get:collection', 'user:get:collection:basic', 'user:get', 'user:post', 'user:patch', 'dayoff:get:collection', 'appointment:get', 'location:get:collection'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private ?string $firstname = null;

    #[Groups(['user:get:collection', 'user:get:collection:basic', 'user:get', 'user:post', 'user:patch', 'dayoff:get:collection', 'appointment:get', 'location:get:collection'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    private ?string $lastname = null;

    #[Groups(['user:get:collection', 'user:get', 'user:post'])]
    #[ORM\Column(length: 180, unique: true)]
    #[Assert\NotBlank]
    #[Assert\Email]
    private ?string $email = null;

    #[Groups(['user:get:collection', 'user:get', 'user:post', 'user:statistic'])]
    #[ORM\Column]
    private array $roles = [];

    #[ORM\Column]
    private ?string $password = null;

    #[Groups(['user:post'])]
    private ?string $plainPassword = null;

    #[Groups(['user:get', 'user:patch'])]
    #[ORM\Column(length: 255, nullable: true)]
    private ?string $phoneNumber = null;

    #[Groups(['user:get:collection', 'user:get', 'user:patch'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Choice(choices: ['ACTIVE', 'INACTIVE', 'INVITED', 'REJECTED', 'DELETED'])]
    private ?string $status = null;

    #[Groups(['user:upload:image'])]
    #[Vich\UploadableField(mapping: 'booker_image', fileNameProperty: 'imagePath')]
    private ?File $imageFile = null;

    #[Groups(['user:get', 'user:patch'])]
    #[ORM\OneToOne(inversedBy: 'user', cascade: ['persist', 'remove'])]
    private ?Address $address = null;

    #[Groups(['user:post'])]
    #[ORM\ManyToOne(inversedBy: 'users', cascade: ['persist'])]
    private ?Organisation $organisation = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: DayOff::class, orphanRemoval: true)]
    private Collection $daysOff;

    #[ORM\OneToMany(mappedBy: 'coach', targetEntity: Appointment::class, orphanRemoval: true)]
    private Collection $coachAppointments;

    #[ORM\OneToMany(mappedBy: 'client', targetEntity: Appointment::class, orphanRemoval: true)]
    private Collection $clientAppointments;

    #[Groups(['user:get', 'user:patch:schedule:update'])]
    #[ORM\OneToMany(mappedBy: 'user', cascade: ['persist'], targetEntity: Schedule::class, orphanRemoval: true)]
    private Collection $schedules;

    #[ORM\ManyToMany(targetEntity: Location::class, inversedBy: 'users')]
    private Collection $locations;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $imagePath = null;

    public function __construct()
    {
        $this->status = 'INVITED';
        $this->daysOff = new ArrayCollection();
        $this->coachAppointments = new ArrayCollection();
        $this->clientAppointments = new ArrayCollection();
        $this->locations = new ArrayCollection();

        // Create empty schedules for each day of the week
        $this->schedules = new ArrayCollection();
        foreach (['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'] as $day) {
            $schedule = new Schedule();
            $schedule->setUser($this);
            $schedule->setDay($day);
            $this->schedules->add($schedule);
        }
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
        return $this->phoneNumber;
    }

    public function setPhoneNumber(?string $phoneNumber): static
    {
        $this->phoneNumber = $phoneNumber;

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

    public function getAddress(): ?Address
    {
        return $this->address;
    }

    public function setAddress(?Address $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getImageFile(): ?File
    {
        return $this->imageFile;
    }

    public function setImageFile(?File $imageFile): void
    {
        $this->imageFile = $imageFile;
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
     * @return Collection<int, Schedule>
     */
    public function getSchedules(): Collection
    {
        return $this->schedules;
    }

    public function addSchedule(Schedule $schedule): static
    {
        if (!$this->schedules->contains($schedule)) {
            $this->schedules->add($schedule);
            $schedule->setUser($this);
        }

        return $this;
    }

    public function removeSchedule(Schedule $schedule): static
    {
        if ($this->schedules->removeElement($schedule)) {
            // set the owning side to null (unless already changed)
            if ($schedule->getUser() === $this) {
                $schedule->setUser(null);
            }
        }

        return $this;
    }

    public function clearSchedules(): static
    {
        $this->schedules->clear();

        return $this;
    }

    /**
     * @return Collection<int, Location>
     */
    public function getLocations(): Collection
    {
        return $this->locations;
    }

    public function addLocation(Location $location): static
    {
        if (!$this->locations->contains($location)) {
            $this->locations->add($location);
        }

        return $this;
    }

    public function removeLocation(Location $location): static
    {
        $this->locations->removeElement($location);

        return $this;
    }

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function setImagePath(?string $imagePath): static
    {
        $this->imagePath = $imagePath;

        return $this;
    }
}
