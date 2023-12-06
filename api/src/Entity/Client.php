<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ClientRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ClientRepository::class)]
#[ApiResource]
class Client
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $phone_number = null;

    #[ORM\OneToOne(inversedBy: 'client_id', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user_id = null;

    #[ORM\OneToMany(mappedBy: 'client_id', targetEntity: Appointment::class)]
    private Collection $appointments_ids;

    public function __construct()
    {
        $this->appointments_ids = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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
            $appointmentsId->setClientId($this);
        }

        return $this;
    }

    public function removeAppointmentsId(Appointment $appointmentsId): static
    {
        if ($this->appointments_ids->removeElement($appointmentsId)) {
            // set the owning side to null (unless already changed)
            if ($appointmentsId->getClientId() === $this) {
                $appointmentsId->setClientId(null);
            }
        }

        return $this;
    }
}
