<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ServiceRepository;
use App\Entity\Traits\TimestampableTrait;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;


#[ORM\Entity(repositoryClass: ServiceRepository::class)]
#[ApiResource]
class Service
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    private ?string $description = null;

    #[ORM\Column]
    private ?int $duration = null;

    #[ORM\Column]
    private ?float $price = null;

    #[ORM\OneToMany(mappedBy: 'service_id', targetEntity: UserService::class)]
    private Collection $user_services_ids;

    #[ORM\OneToMany(mappedBy: 'service_id', targetEntity: Appointment::class)]
    private Collection $appointments_ids;

    public function __construct()
    {
        $this->user_services_ids = new ArrayCollection();
        $this->appointments_ids = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): static
    {
        $this->duration = $duration;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

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
            $userServicesId->setServiceId($this);
        }

        return $this;
    }

    public function removeUserServicesId(UserService $userServicesId): static
    {
        if ($this->user_services_ids->removeElement($userServicesId)) {
            // set the owning side to null (unless already changed)
            if ($userServicesId->getServiceId() === $this) {
                $userServicesId->setServiceId(null);
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
            $appointmentsId->setServiceId($this);
        }

        return $this;
    }

    public function removeAppointmentsId(Appointment $appointmentsId): static
    {
        if ($this->appointments_ids->removeElement($appointmentsId)) {
            // set the owning side to null (unless already changed)
            if ($appointmentsId->getServiceId() === $this) {
                $appointmentsId->setServiceId(null);
            }
        }

        return $this;
    }
}
