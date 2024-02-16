<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CoachRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CoachRepository::class)]
#[ApiResource]
class Coach
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $phone_number = null;

    #[ORM\Column(type: Types::ARRAY)]
    private array $photos = [];

    #[ORM\OneToOne(inversedBy: 'coach_id', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user_id = null;

    #[ORM\OneToMany(mappedBy: 'coach_id', targetEntity: UserLocation::class)]
    private Collection $user_locations_ids;

    #[ORM\OneToMany(mappedBy: 'coach_id', targetEntity: Schedule::class)]
    private Collection $schedules_ids;

    #[ORM\OneToMany(mappedBy: 'coach_id', targetEntity: DayOff::class)]
    private Collection $days_off_ids;

    #[ORM\OneToMany(mappedBy: 'coach_id', targetEntity: UserService::class)]
    private Collection $user_services_ids;

    #[ORM\OneToMany(mappedBy: 'coach_id', targetEntity: Appointment::class)]
    private Collection $appointments_ids;

    public function __construct()
    {
        $this->user_locations_ids = new ArrayCollection();
        $this->schedules_ids = new ArrayCollection();
        $this->days_off_ids = new ArrayCollection();
        $this->user_services_ids = new ArrayCollection();
        $this->appointments_ids = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPhoneNumber(): ?int
    {
        return $this->phone_number;
    }

    public function setPhoneNumber(int $phone_number): static
    {
        $this->phone_number = $phone_number;

        return $this;
    }

    public function getPhotos(): array
    {
        return $this->photos;
    }

    public function setPhotos(array $photos): static
    {
        $this->photos = $photos;

        return $this;
    }

    public function getUserId(): ?User
    {
        return $this->user_id;
    }

    public function setUserId(User $user_id): static
    {
        $this->user_id = $user_id;

        return $this;
    }

    /**
     * @return Collection<int, UserLocation>
     */
    public function getUserLocationsIds(): Collection
    {
        return $this->user_locations_ids;
    }

    public function addUserLocationsId(UserLocation $userLocationsId): static
    {
        if (!$this->user_locations_ids->contains($userLocationsId)) {
            $this->user_locations_ids->add($userLocationsId);
            $userLocationsId->setCoachId($this);
        }

        return $this;
    }

    public function removeUserLocationsId(UserLocation $userLocationsId): static
    {
        if ($this->user_locations_ids->removeElement($userLocationsId)) {
            // set the owning side to null (unless already changed)
            if ($userLocationsId->getCoachId() === $this) {
                $userLocationsId->setCoachId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Schedule>
     */
    public function getSchedulesIds(): Collection
    {
        return $this->schedules_ids;
    }

    public function addSchedulesId(Schedule $schedulesId): static
    {
        if (!$this->schedules_ids->contains($schedulesId)) {
            $this->schedules_ids->add($schedulesId);
            $schedulesId->setCoachId($this);
        }

        return $this;
    }

    public function removeSchedulesId(Schedule $schedulesId): static
    {
        if ($this->schedules_ids->removeElement($schedulesId)) {
            // set the owning side to null (unless already changed)
            if ($schedulesId->getCoachId() === $this) {
                $schedulesId->setCoachId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, DayOff>
     */
    public function getDaysOffIds(): Collection
    {
        return $this->days_off_ids;
    }

    public function addDaysOffId(DayOff $daysOffId): static
    {
        if (!$this->days_off_ids->contains($daysOffId)) {
            $this->days_off_ids->add($daysOffId);
            $daysOffId->setCoachId($this);
        }

        return $this;
    }

    public function removeDaysOffId(DayOff $daysOffId): static
    {
        if ($this->days_off_ids->removeElement($daysOffId)) {
            // set the owning side to null (unless already changed)
            if ($daysOffId->getCoachId() === $this) {
                $daysOffId->setCoachId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, UserService>
     */
    public function getUserServicesIds(): Collection
    {
        return $this->user_services_ids;
    }

    public function addUserServicesId(UserService $userServicesId): static
    {
        if (!$this->user_services_ids->contains($userServicesId)) {
            $this->user_services_ids->add($userServicesId);
            $userServicesId->setCoachId($this);
        }

        return $this;
    }

    public function removeUserServicesId(UserService $userServicesId): static
    {
        if ($this->user_services_ids->removeElement($userServicesId)) {
            // set the owning side to null (unless already changed)
            if ($userServicesId->getCoachId() === $this) {
                $userServicesId->setCoachId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Appointment>
     */
    public function getAppointmentsIds(): Collection
    {
        return $this->appointments_ids;
    }

    public function addAppointmentsId(Appointment $appointmentsId): static
    {
        if (!$this->appointments_ids->contains($appointmentsId)) {
            $this->appointments_ids->add($appointmentsId);
            $appointmentsId->setCoachId($this);
        }

        return $this;
    }

    public function removeAppointmentsId(Appointment $appointmentsId): static
    {
        if ($this->appointments_ids->removeElement($appointmentsId)) {
            // set the owning side to null (unless already changed)
            if ($appointmentsId->getCoachId() === $this) {
                $appointmentsId->setCoachId(null);
            }
        }

        return $this;
    }
}
