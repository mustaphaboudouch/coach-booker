<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\User;
use Exception;
use Resend;
use SendinBlue\Client\Api\EmailCampaignsApi;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use SendinBlue\Client\Configuration;
use SendinBlue\Client\Api\TransactionalEmailsApi;
use SendinBlue\Client\Model\CreateEmailCampaign;
use SendinBlue\Client\Model\SendSmtpEmail;

class UserSubscriber implements EventSubscriberInterface
{
    public function onInscriptionSuccess(ViewEvent $event): void
    {
        $entity = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!$entity instanceof User || Request::METHOD_POST !== $method) {
            return;
        }

        $this->sendSubscriptionEmail($entity);
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['onInscriptionSuccess', EventPriorities::POST_WRITE],
        ];
    }


    private function sendSubscriptionEmail(User $user): void
    {
        $sendInBlueApiKey = $_ENV['SENDINBLUE_API_KEY'];

        $config = Configuration::getDefaultConfiguration()->setApiKey('api-key', $sendInBlueApiKey);
        $apiInstance = new TransactionalEmailsApi(null, $config);

        $userRoles = $user->getRoles();

        $orgAdmin = "ROLE_ORG_ADMIN";
        $coach = "ROLE_ORG_COACH";

        if (in_array($orgAdmin, $userRoles) or in_array($coach, $userRoles)) {
            //TODO : Change the link href when we will have the final production URL
            $htmlContent = '
                <div style="background-color: #f4f4f4; padding: 20px;">
                    <h2 style="color: #333;">Invitation à rejoindre ton organisation dans CoachBooker</h2>
                    <p style="color: #666;">Votre organisation vous invite à la rejoindre sur coach booker où elle propose ses services</p>
                    <p style="color: #666;">Voici vos identifiants :</p>
                    <ul style="color: #666;">
                        <li>email : ' . $user->getEmail() . ' </li>
                        <li>mot de passe : ' . $user->getPlainPassword() . '</li>
                    </ul>
                    <p style="text-align: center;">
                        <a href="#/sign-in" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Connexion</a>
                    </p>
                    <p style="color: #666;">À bientôt sur coach booker !</p>
                    <p style="color: #666;">Cordialement,</p>
                </div> 
            ';

            $subject = 'Invitation à rejoindre votre organisation dans Coach Booker';
        } else {
            //TODO : Change the link href when we will have the final production URL
            $htmlContent = '
                <div style="background-color: #f4f4f4; padding: 20px;">
                    <h1 style="color: #333; text-align: center;">Bienvenue sur Coach Booker !</h1>
                    <p style="color: #666;">Nous sommes ravis de vous accueillir sur Coach Booker, la plateforme qui vous connecte avec des coachs sportifs professionnels et des salles de sport de qualité.</p>
                    <p style="color: #666;">Sur Coach Booker, vous pouvez :</p>
                    <ul style="color: #666;">
                        <li>Explorer une variété de coachs, de salles de sport et de services pour trouver celui qui correspond le mieux à vos besoins</li>
                        <li>Réserver des séances d\'entraînement en fonction de votre emploi du temps et de vos préférences</li>
                    </ul>
                    <p style="color: #666;">Commencez dès maintenant en parcourant notre catalogue de coachs et de salles de sport :</p>
                    <p style="text-align: center;">
                        <a href="#/home" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Découvrir Coach Booker</a>
                    </p>
                    <p style="color: #666;">Nous espérons que Coach Booker vous aidera à atteindre vos objectifs de remise en forme et à vivre une vie plus saine et plus active.</p>
                    <p style="color: #666;">Bienvenue à bord !</p>
                    <p style="color: #666;">Cordialement,</p>
                    <p style="color: #666;">L\'équipe Coach Booker</p>
                </div> 
            ';

            $subject = 'Confirmation de votre inscription sur Coach Booker';
        }

        // Create an instance of SendSmtpEmail
        $sendSmtpEmail = new SendSmtpEmail([
            'sender' => ['email' => 'noreply@coachbooker.com', 'name' => 'Coach Booker'],
            'to' => [['email' => $user->getEmail()]],
            'htmlContent' => $htmlContent,
            'subject' => $subject,
        ]);

        try {
            $apiInstance->sendTransacEmail($sendSmtpEmail);
        } catch (Exception $e) {
            echo 'Exception when calling TransactionalEmailsApi->sendTransacEmail: ', $e->getMessage(), PHP_EOL;
        }
    }
}
