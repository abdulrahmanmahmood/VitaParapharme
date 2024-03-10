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

      <div className="bg-gray-50 bottom-0 overflow-y-hidden mt-[150px]">
        <div className="mt-3 relative top-12 lg:top-0 lg:mx-12 overflow-y-hidden md:px-5  sm:px-2">
          <div className="">
            <WhatsAppIcon />
            <div className="mb-5">
              <h2>{translations[language]?.termsand}</h2>
              <h6>{translations[language]?.welcometo}</h6>
              <h6>{translations[language]?.adjust}</h6>
              <h6>{translations[language]?.assume}</h6>
              <h6>{translations[language]?.definition}</h6>
              <h6>{translations[language]?.accessing}</h6>
              <h6>{translations[language]?.most}</h6>
              <h6>{translations[language]?.license}</h6>
              <h6>{translations[language]?.mustnot}</h6>
              <h6>{translations[language]?.repuplish}</h6>
              <h6>{translations[language]?.sell}</h6>
              <h6>{translations[language]?.repro}</h6>
              <h6>{translations[language]?.distribute}</h6>
              <h6> {translations[language]?.agreement}</h6>
              <h6>{translations[language]?.avail}</h6>
              <h6>{translations[language]?.reserve}</h6>
              <h6>{translations[language]?.you}</h6>
              <h6>{translations[language]?.comment}</h6>
              <h6>{translations[language]?.les}</h6>
              <h6>{translations[language]?.lestwo}</h6>
              <h6>{translations[language]?.grant}</h6>
              <h6>{translations[language]?.hyper}</h6>
              <h6>{translations[language]?.may}</h6>
              <h6>{translations[language]?.agenc}</h6>
              <h6>{translations[language]?.search}</h6>
              <h6>{translations[language]?.press}</h6>
              <h6>{translations[language]?.online}</h6>
              <h6>{translations[language]?.Systematic}</h6>
              <h6>{translations[language]?.these}</h6>
              <h6>{translations[language]?.cons}</h6>
              <h6>{translations[language]?.know}</h6>
              <h6>{translations[language]?.dotcom}</h6>
              <h6>{translations[language]?.group}</h6>
              <h6>{translations[language]?.electronic}</h6>
              <h6>{translations[language]?.portals}</h6>
              <h6>{translations[language]?.account}</h6>
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
        <Footer />
      </div>
    </div>
  );
}
export default PrivacyPolicy;
