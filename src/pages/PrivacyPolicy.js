import "./changepassword.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  setLanguage,
  selectLanguage,
  selectTranslations,
} from "../rtk/slices/Translate-slice";
import NavHeader from "../components/NavHeader";
import email from "../images/Email icon.png";
import address from "../images/Location icon.png";
import phone from "../images/phone icon.png";
import { Link } from "react-router-dom";
import WhatsAppIcon from "../components/Whatsapp";
import Footer from "../components/Footer";
import "./privacypolicy.css";

function PrivacyPolicy() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const translations = useSelector(selectTranslations);
  const language = useSelector(selectLanguage);

  const [searchTerm, setSearchTerm] = useState("");
  const allProducts = useSelector((state) => state.products);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term.toLowerCase());
  };

  const handleProductClick = (productId) => {
    navigate(`/home/product/${productId}`);
  };

  return (
    <div>
      <NavHeader
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleProductClick={handleProductClick}
      />

      <div className="green-containerr cartGreen mt-[200px]">
        <div className="header-container">
          <div className=" testtt">
            <WhatsAppIcon />
            <div className="changePasswordText">
              <h2>Conditions générales</h2>
              <h6>Bienvenue à Et Vitapara!</h6>
              <h6>
                Ces termes et conditions définissent les règles et
                réglementations pour l'utilisation du site Et Vitapara,
                disponible à l'adresse : https://vitaparapharma.com/.
              </h6>
              <h6>
                En accédant à ce site, nous supposons que vous acceptez ces
                termes et conditions. Ne continuez pas à utiliser Et Vitapara si
                vous n'acceptez pas tous les termes et conditions mentionnés sur
                cette page.
              </h6>
              <h6>
                La définition suivante s'applique à ces termes et conditions, à
                la déclaration de confidentialité, à l'avis de
                non-responsabilité et à tous les accords : "Le client", "Vous"
                fait référence à vous, la personne qui navigue sur ce site et
                accepte les termes et conditions de la société. "La Société",
                "Nous", fait référence à notre entreprise. "Partie", "Parties"
                fait référence à la fois au client et à nous. Tous les termes se
                réfèrent à l'offre, l'acceptation et le paiement nécessaires
                pour mener à bien un processus d'assistance au client de la
                manière la plus appropriée, dans le but de satisfaire les
                besoins du client en ce qui concerne la fourniture des services
                de la société mentionnés, conformément à et sous réserve de la
                loi en vigueur. Toute utilisation des termes susmentionnés ou
                d'autres mots au singulier ou au pluriel, ou en utilisant des
                majuscules, et/ou lui/elle ou eux, est considérée comme
                interchangeable et se réfère donc à la même chose.
              </h6>
              <h6>
                Cookies Nous utilisons des cookies. En accédant à Et Vitapara,
                vous avez accepté l'utilisation de cookies conformément à la
                politique de confidentialité d'Et Vitapara.
              </h6>
              <h6>
                La plupart des sites web interactifs utilisent des cookies pour
                nous permettre de récupérer les détails de l'utilisateur pour
                chaque visite. Notre site utilise des cookies pour activer
                certaines fonctionnalités afin de faciliter la navigation pour
                les personnes qui visitent notre site web. Certains de nos
                partenaires affiliés/annonceurs peuvent également utiliser des
                cookies.
              </h6>
              <h6>
                Licence Sauf indication contraire, Et Vitapara et/ou ses
                concédants de licence détiennent les droits de propriété
                intellectuelle de tout le matériel présent sur Et Vitapara. Tous
                les droits de propriété intellectuelle sont réservés. Vous
                pouvez accéder à ceci depuis Et Vitapara pour votre usage
                personnel tout en respectant les restrictions énoncées dans ces
                termes et conditions.
              </h6>
              <h6>Vous ne devez pas :</h6>
              <h6>Republier le contenu de Et Vitapara.</h6>
              <h6>
                Vendre, louer ou sous-licencier le contenu de Et Vitapara.
              </h6>
              <h6>
                Reproduire, copier ou dupliquer le contenu de Et Vitapara.
              </h6>
              <h6>Distribuer le contenu de Et Vitapara.</h6>
              <h6>
                Cet accord prend effet à compter de sa date. Nos termes et
                conditions ont été créés avec l'aide d'un générateur gratuit de
                termes et conditions.
              </h6>
              <h6>
                Des parties de ce site offrent aux utilisateurs la possibilité
                de publier et d'échanger des opinions et informations dans
                certaines zones du site. Et Vitapara ne filtre, n'édite, ne
                publie ni ne révise les commentaires avant leur apparition sur
                le site. Les commentaires ne reflètent pas les vues et opinions
                de Et Vitapara, de ses agents et/ou de ses filiales. Les
                commentaires reflètent les vues et opinions de la personne qui
                publie ses propres vues et opinions. Dans la mesure permise par
                la loi applicable, Et Vitapara ne sera pas responsable des
                commentaires ou de toute responsabilité, dommages ou dépenses
                causés et/ou subis à la suite de l'utilisation et/ou de la
                publication et/ou de l'apparition des commentaires sur ce site.
              </h6>
              <h6>
                Et Vitapara se réserve le droit de surveiller tous les
                commentaires et de supprimer tout commentaire qui pourrait être
                considéré comme inapproprié, offensant ou en violation de ces
                termes et conditions.
              </h6>
              <h6>Vous garantissez et déclarez que :</h6>
              <h6>
                Les commentaires ne violent aucun droit de propriété
                intellectuelle, y compris sans limitation les droits d'auteur,
                brevets ou marques déposées d'un tiers ;
              </h6>
              <h6>
                Les commentaires ne contiennent aucun matériel diffamatoire,
                offensant, injurieux, inapproprié ou illégal constituant une
                violation de la vie privée ;
              </h6>
              <h6>
                Les commentaires ne seront pas utilisés pour solliciter ou
                promouvoir des affaires ou des coutumes, ou pour mener des
                activités commerciales ou illégales.
              </h6>
              <h6>
                Par la présente, vous accordez à Et Vitapara une licence non
                exclusive pour utiliser, reproduire, éditer et autoriser
                d'autres à utiliser, reproduire et éditer n'importe lequel de
                vos commentaires sous n'importe quelle forme, format ou médium.
              </h6>
              <h6>Le lien hypertexte vers notre contenu</h6>
              <h6>
                Les organisations suivantes peuvent créer un lien vers notre
                site web sans autorisation écrite préalable :
              </h6>
              <h6>Les agences gouvernementales ;</h6>
              <h6>Les moteurs de recherche ;</h6>
              <h6>Les organismes de presse ;</h6>
              <h6>
                Les distributeurs d'annuaires en ligne peuvent créer un lien
                vers notre site de la même manière qu'ils le font vers les sites
                web d'autres entreprises répertoriées ; et
              </h6>
              <h6>
                Les entreprises accréditées au niveau du système à l'exception
                des organisations à but non lucratif sollicitant des dons, des
                centres commerciaux caritatifs, et des groupes collectant des
                dons caritatifs qui ne peuvent pas créer un lien vers notre site
                web.
              </h6>
              <h6>
                Ces organisations peuvent créer un lien vers notre page
                d'accueil, nos publications ou d'autres informations sur le site
                web tant que le lien : (a) n'est en aucun cas trompeur ; (b)
                n'implique pas à tort le parrainage, l'approbation ou
                l'approbation de la partie liée et de ses produits et/ou
                services ; et (c) convient au contexte du site de la partie
                liée.
              </h6>
              <h6>
                Nous pourrions considérer et approuver d'autres demandes de
                liaison provenant des types d'organisations suivants :
              </h6>
              <h6>
                sources d'information connues des consommateurs et/ou des
                entreprises ;
              </h6>
              <h6>sites communautaires dot.com ;</h6>
              <h6>
                associations ou autres groupes représentant des œuvres
                caritatives ;
              </h6>
              <h6>distributeurs d'annuaires électroniques ;</h6>
              <h6>portails électroniques ;</h6>
              <h6>cabinets de comptabilité, de droit et de conseil ; et</h6>
              <h6>
                établissements d'enseignement et associations commerciales.
              </h6>
              <h6>
                Nous approuverons les demandes de liens soumises par ces
                organisations si nous décidons ce qui suit : (a) Le lien ne nous
                fera pas apparaître de manière négative à nos yeux ou à ceux de
                nos entreprises accréditées ; (b) L'organisation n'a pas
                d'antécédents négatifs avec nous ; (c) L'avantage que nous
                retirons de la visibilité du lien hypertexte compense l'absence
                d'Et Vitapara ; (d) Le lien se trouve dans le contexte des
                ressources d'information générale.
              </h6>
              <h6>
                Ces organisations peuvent créer un lien vers notre page
                d'accueil tant que le lien : (a) n'est en aucune manière
                trompeur ; (b) ne suggère pas faussement une sponsorship ou une
                approbation de la part de l'entité liée, ou de ses produits ou
                services ; (c) convient au contexte du site de l'entité liée.
              </h6>
              <h6>
                Si vous faites partie des organisations mentionnées au
                paragraphe 2 ci-dessus et que vous souhaitez créer un lien vers
                notre site web, vous devez nous en informer en envoyant un
                courriel à Et Vitapara. Veuillez inclure votre nom, le nom de
                votre organisation, vos coordonnées ainsi que l'URL de votre
                site, une liste des URLs à partir desquelles vous envisagez de
                créer un lien vers notre site web, et une liste des URLs de
                notre site auxquelles vous souhaitez être lié. Attendez une
                réponse pendant 2 à 3 semaines.
              </h6>
              <h6>
                Les organisations approuvées peuvent créer des liens vers notre
                site web de la manière suivante :
              </h6>
              <h6>
                En utilisant notre nom commercial ; ou <br></br>
                En utilisant l'URL uniforme auquel il est lié ; ou <br></br>
                En utilisant toute autre description de notre site web vers
                lequel il est lié, qui est logique dans le contexte et le format
                du contenu sur le site de la partie créant le lien. <br></br>
                Il n'est pas autorisé d'utiliser le logo d'Et Vitapara ou toute
                autre œuvre d'art pour créer un lien en l'absence d'un accord de
                licence de marque déposée.<br></br>
              </h6>
              <h6>
                Encadrements <br></br>
                Sans autorisation préalable et permission écrite, vous n'êtes
                pas autorisé à créer des cadres autour de nos pages Web qui
                modifient de quelque manière que ce soit la présentation
                visuelle ou l'apparence de notre site.
              </h6>
              <h6>
                Responsabilité du contenu <br></br>
                Nous ne prendrons aucune responsabilité pour le contenu qui
                apparaît sur votre site web. Vous acceptez de nous protéger et
                de nous défendre contre toutes les revendications qui
                surviennent sur votre site web. Aucun lien ne doit apparaître
                sur un site web qui pourrait être interprété comme diffamatoire,
                obscène, criminel, ou qui viole, tend à violer, incite à la
                violation ou implique une autre violation des droits de tout
                tiers.
              </h6>
              <h6>
                Réservation des droits <br></br>
                Nous nous réservons le droit de vous demander de retirer tous
                les liens ou tout lien spécifique vers notre site Web. Vous
                acceptez de retirer immédiatement tous les liens vers notre site
                à notre demande. Nous nous réservons également le droit de
                modifier ces termes et conditions et notre politique de liens à
                tout moment. En continuant à lier à notre site Web, vous
                acceptez de respecter et de suivre ces termes et conditions de
                lien.
              </h6>
              <h6>
                Retirer les liens de notre site <br></br>
                Si vous trouvez un lien sur notre site qui est offensant pour
                une raison quelconque, n'hésitez pas à nous contacter et à nous
                en informer à tout moment. Nous considérerons les demandes de
                suppression de liens, mais nous ne sommes pas obligés de le
                faire ou de vous répondre directement.
              </h6>
              <h6>
                Nous ne garantissons pas l'exactitude des informations fournies
                sur ce site, ni leur exhaustivité ou leur précision; de plus,
                nous ne promettons pas que le site restera disponible ou que les
                matériaux présents sur le site seront mis à jour.
              </h6>
              <h6>
                Désistement <br></br>
                Dans la mesure permise par la loi applicable, nous excluons
                toutes représentations, garanties et conditions relatives à
                notre site web et à l'utilisation de ce site. Cette décharge ne
                contient pas :
              </h6>
              <h6>
                La limitation ou l'exclusion de notre responsabilité ou de votre
                responsabilité pour décès ou blessures corporelles; <br></br>
                La limitation ou l'exclusion de notre responsabilité ou de votre
                responsabilité pour fraude ou fausse déclaration frauduleuse;{" "}
                <br></br>
                La limitation de l'une de nos responsabilités ou de vos
                responsabilités de toute manière non autorisée par la loi
                applicable; ou <br></br>
                Exclure l'une de nos responsabilités ou de vos responsabilités
                qui ne peut être exclue conformément à la loi applicable.{" "}
                <br></br>
                Les limites et exclusions de responsabilité énoncées dans cette
                section et ailleurs dans cette décharge : (a) sont soumises au
                paragraphe précédent ; et (b) régissent toutes les obligations
                découlant de cette décharge, y compris les obligations
                contractuelles, la responsabilité délictuelle et la violation
                d'une obligation légale.
              </h6>
              <h6>
                Tant que le site, les informations et les services fournis sur
                le site sont gratuits, nous ne serons pas responsables de toute
                perte ou dommage de quelque nature que ce soit.
              </h6>
            </div>
          </div>
        </div>
      </div>
      <Footer />

    </div>
  );
}
export default PrivacyPolicy;
