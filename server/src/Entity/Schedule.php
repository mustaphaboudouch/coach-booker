<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use App\Repository\ScheduleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ScheduleRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(),
        new Post(
            security: "is_granted('ROLE_ADMIN')
                or (is_granted('ROLE_ORG_ADMIN') and object.getUser().getOrganisation() == user.getOrganisation())
                or (is_granted('ROLE_ORG_COACH') and object.getUser().getOrganisation() == user.getOrganisation()))
            ",
        ),
        new Patch(
            security: "is_granted('ROLE_ADMIN')
                or (is_granted('ROLE_ORG_ADMIN') and object.getUser().getOrganisation() == user.getOrganisation())
                or (is_granted('ROLE_ORG_COACH') and object.getUser().getOrganisation() == user.getOrganisation()))
            ",
        ),
    ],
)]
class Schedule
{
    #[Groups(['user:get'])]
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Groups(['user:get', 'user:patch:schedule:update'])]
    #[ORM\Column(length: 255)]
    #[Assert\NotBlank]
    #[Assert\Choice(choices: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'])]
    private ?string $day = null;

    #[ORM\ManyToOne(inversedBy: 'schedules')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

    #[Groups(['user:get', 'user:patch:schedule:update'])]
    #[ORM\OneToMany(mappedBy: 'schedule', cascade: ['persist'], targetEntity: Period::class, orphanRemoval: true)]
    private Collection $periods;

    public function __construct()
    {
        $this->periods = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDay(): ?string
    {
        return $this->day;
    }

    public function setDay(string $day): static
    {
        $this->day = $day;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, Period>
     */
    public function getPeriods(): Collection
    {
        return $this->periods;
    }

    public function addPeriod(Period $period): static
    {
        if (!$this->periods->contains($period)) {
            $this->periods->add($period);
            $period->setSchedule($this);
        }

        return $this;
    }

    public function removePeriod(Period $period): static
    {
        if ($this->periods->removeElement($period)) {
            // set the owning side to null (unless already changed)
            if ($period->getSchedule() === $this) {
                $period->setSchedule(null);
            }
        }

        return $this;
    }
}
