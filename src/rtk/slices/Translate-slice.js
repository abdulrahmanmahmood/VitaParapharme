import { createSlice } from "@reduxjs/toolkit";

const translationSlice = createSlice({
  name: "translation",
  initialState: {
    language: "en",
    direction: "ltr",
    translations: {
      en: {
        home: "Home",
        store: "Store",
        about: "About Us",
        brand: "International brands",
        blog: "Blog",
        contact: "Contact Us",
        new: "What's new",
        discover: "Discover everything new",
        detailsbtn: "details",
        links: "Important links",
        shipping:
          "Shipping Information To ensure your purchases arrive safely, please be sure to provide",
        private: "Private Policy",
        cookies: "cookies Policy",
        info: "Delivery Information",
        contactP:
          "Contact us for any inquiries or assistance you require, we are here to provide support and advice",
        subscribe: "Subscribe to AdobeXD via Email",
        login: "Sign In",
        register: "Sign Up",
        newhere: "New Here ?",
        welcome: "we are glad you visited our website",
        oneofus: "One Of Us",
        interested: "You may also be interested in ",
        track: "Track Order",
        orders: "orders",
        logout: "logout",
        placed: "Placed",
        process: "Processing",
        shipped: "Shipped",
        deliver: "Delivered",
        aboutParagraph:
          "Your trusted partner for your health needs. We provide high-quality products and distinguished service to ensure your health and comfort. Get to know us and how we care for you",
        buyabout: "Buy Now",
        accuracy: "High accuracy",
        accuracyParagraph:
          "High accuracy guarantees you an excellent shopping experience on our e-commerce website, as we always strive to ensure the quality of our products and the accuracy of our services",
        awards: "awards",
        winners:
          "Winners of multiple awards, we guarantee you an exceptional shopping experience on our e-commerce website, as our  services and products are distinguished by excellence and recognition.",
        friends: "Friends of yours",
        friendParagraph:
          "We are your friends' place in the world of e-commerce, as we provide you with products and services that give you a unique and reliable shopping experience",
        Fastshipping: "Fast shipping",
        offer:
          "We offer a fast shipping service that makes your products reach you as quickly as possible, so you can enjoy an immediate and comfortable shopping experience",
        addresscontact: "Address",
        addressdescontact:
          "LAAYOUNE : MADINAT EL WAHDA BLOC B NR 91 LAAYOUNE (M).",
        addressdescontacttwo:
          "Tetouan: Mezanine bloc B Bureau n 4 BOROUJ 16 Avenue des Far N° 873 Tétouan",
        hours: "Working hours",
        day: "Monday to Friday: 7am - 7pm",
        weekend: "Weekend: 10am - 5pm",
        phonenumber: "phone number",
        email: "Email",
        contactform:
          "You are always welcome to contact us with questions, and inquiry about our services.",
        submitcontact: "submit message",
        categories: "Categories",
        magasin: "Store",
        learnmore: "Learn more through our product categories",
        rating: "rating",
        price: "price",
        category: "Category",
        AllCategories: "All Categories",
        addtocart: "add to cart",
        firstname: "Your Name",
        message: "message",
        save: "save",
        cancel: "cancel",
        edit: "edit",
        myorder: "My Orders",
        view: "View and edit all your pending Delivered and Returned Orders here.",
        orderplaced: "Order Placed",
        totalorder: "Total Order",
        totalprice: "total price",
        confirm: "confirm",
        change: "Change Your Password",
        choose:
          "Choose a strong password and don't reuse it for other accounts.",
        changing:
          "Changing your password will sign you out of all your devices. You will need to enter your new password on all your devices.",
        newpass: "new password",
        oldpass: "current password",
        myprofile: "My Profile",
        wishlist: "Wishlist",
        cart: "Cart",
        changepass: "Change Password",
        searchblog: "search blog",
        country: "country",
        city: "city",
        region: "region",
        street: "street",
        zipcode: "zipCode",
        all: "All",
        experience: "Experience our app for a better mobile experience!",
        download: "Download now from the App Store or Google Play Store.",
        aboutpro: "about this product ",
        productdet: "product details",
        main: "Categories",
        sub: "Sub Category",
        action: "action",
        delete: "delete",
        confirmorder: "confirm ",
        deleteadd: "Delete",
        addaddress: "add new address",
        saveadd: "Save Address",
        orderstatus: "Order Status",
        show: "Show Details",
        hide: "hide details",
        product: "Product",
        quantity: "Quantity",
        unit: "Unit Price",
        total: "Total Price",
        clear: "Clear Filters",
        important: "important links",
        privacy: "privacy policy",
        terms: "terms & conditions",
        information: "Information on delivery",
        pfooter:
          "Shipping Information To ensure your purchases arrive safely, please be sure to provide the correct address and telephone number to ensure a convenient and efficient shopping experience. Make sure your shipping information is up to date, including address details and desired delivery time, to ensure you receive your order quickly and without unnecessary delays.",
        contactdetails: "contact details",
        require:
          "Contact us for any inquiries or assistance you require, we are here to provide support and advice",
        addfooterone: "LAAYOUNE: MADINAT EL WAHDA BLOCK B NR 91 LAAYOUNE (M)",
        addfootertwo:
          "Tetouan: Mezanine block B Office n° 4 BOROUJ 16 Avenue des Far N° 873 Tétouan",
        popular: "popular products",
        featured: "discover what our featured products are",
        submit: "Submit",
        paiement: "Paiement when receiving",
        personal:
          "Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy",
        agree: "I agree to the",
        and: "and",
        privacypolicy: "the privacy policy",
        termsand: "terms and conditions",
        welcometo: "Welcome to Et Vitapara!",
        adjust:
          "These terms and conditions define the settings and adjustments for use of the Vitapara site, available at the address: https://vitaparapharma.com/.",
        assume:
          "By accessing this site we assume you accept these terms and conditions. Do not continue to use Et Vitapara if you do not accept all of the terms and conditions stated on this page.",
        definition:
          "The definition applies to these terms and conditions, to declare confidentiality, to avoid non-responsibility and to all of the following terms: “The client”, “You” will refer to you, the person who can navigate to you. This site accepts the terms and conditions of the society. “La Société”, “Nous”, fait référence à our enterprise. Partie, Parties refers to the client's home and ours. All these terms are due to offer, acceptance and necessary equipment to help the client process assist with the latest application, in the but satisfactory condition of the client that concerns the furniture. The society's services are mentioned, conformed to and sous réserve de la loi en vigueur. To use suction cups or other mots in a singuler or in a plug, or in a manual device, and/or on/off or on the phone, it is considered as interchangeable and it can be replaced without anything you choose.",
        accessing:
          "Cookies We use cookies. By accessing Et Vitapara, you have accepted the use of cookies in accordance with the Et Vitapara privacy policy.",
        most: "Most interactive websites use cookies to allow us to retrieve user details for each visit. Our site uses cookies to enable certain features to make navigation easier for people visiting our website. Some of our affiliate/advertiser partners may also use cookies.",
        license:
          "License Unless otherwise stated, Et Vitapara and/or its licensors own the intellectual property rights for all material on Et Vitapara. All intellectual property rights are reserved. You may access this from Et Vitapara for your own personal use subject to restrictions set forth in these terms and conditions.",
        mustnot: "You must not :",
        repuplish: "Republish content from Et Vitapara.",
        sell: "Sell, rent or sublicense content from Et Vitapara.",
        repro: "Reproduce, copy or duplicate the content of Et Vitapara.",
        distribute: "Distribute the content of Et Vitapara.",
        agreement:
          "This agreement takes effect from its date. Our terms and conditions have been created with the help of a free terms and conditions generator.",
        avail:
          "Parties of this site are available to users who can publish it and change opinions and information in certain areas of the site. And it doesn't filter, doesn't edit, doesn't publish and doesn't see comments before your apparition on the site. Comments do not reflect on the views and opinions of others, such agents and/or their files. Comments reflect the views and opinions of the person who publishes his/her own views and opinions. With the appropriate permission from the site, it will not be possible to respond to comments or to all responsibilities, dommages or storage spaces and/or are submitted to the application suite and/or the publication and/or the apparition. Comments on this site.",
        reserve:
          "And Vitapara reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or in breach of these Terms and Conditions.",
        you: "You warrant and represent that:",
        comment:
          "The Comments do not violate any intellectual property right, including without limitation copyright, patent or trademark of any third party;",
        les: "The comments do not contain any defamatory, offensive, abusive, inappropriate or unlawful material which constitutes an invasion of privacy;",
        lestwo:
          "The Comments will not be used to solicit or promote business or custom, or to engage in commercial or unlawful activity.",
        grant:
          "You hereby grant Et Vitapara a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.",
        hyper: "The hyperlink to our content",
        may: "The following organizations may link to our Website without prior written permission:",
        agenc: "Government agencies;",
        search: "Search engines;",
        press: "Press organizations;",
        online:
          "Online directory distributors may link to our Site in the same manner as they link to the Websites of other listed businesses;",
        Systematic:
          "Systematic Accredited Businesses except soliciting donation non-profit organizations, charity shopping malls, and groups collecting charitable donations which may not link to our Web site.",
        these:
          "These organizations may link to our home page, publications or other Web site information so long as the link: (a) is not in any way misleading; (b) does not falsely imply sponsorship, endorsement or approval of the linked party and its products and/or services; and (c) is appropriate for the context of the linking party’s site.",
        cons: "We may consider and approve other link requests from the following types of organizations:",
        know: "sources of information known to consumers and/or businesses;",
        dotcom: "dot.com community sites;",
        group: "associations or other groups representing charitable works;",
        electronic: "electronic directory distributors;",
        portals: "electronic portals;",
        account: "accounting, law and consulting firms; And",
        education: "educational institutions and trade associations.",
        approve:
          "We will approve link requests submitted by these organizations if we decide that: (a) the link will not make us look unfavorably to us or to our accredited businesses; (b) The organization has no negative history with us; (c) The benefit we gain from the visibility of the hyperlink compensates for the absence of Et Vitapara; (d) The link is in the context of general information resources.",
        long: "These organizations may link to our home page so long as the link: (a) is not in any way misleading; (b) does not falsely imply sponsorship or endorsement by the linked entity, or its products or services; (c) is appropriate for the context of the linked entity's site.",
        among:
          "If you are among the organizations listed in paragraph 2 above and are interested in linking to our website, you must inform us by sending an e-mail to Et Vitapara. Please include your name, your organization name, contact information as well as the URL of your site, a list of any URLs from which you plan to link to our Website, and a list of the URLs on our site to which you wish to be linked. Wait 2-3 weeks for a response.",
        maytwo:
          "Approved organizations may link to our Website in the following manner:",
        using:
          "Using our business name; Or Using the uniform URL it links to; OrBy use of any other description of our Website being linked to that makes sense within the context and format of content on the linking party's site. You may not use Et Vitapara's logo or other artwork for linking absent a trademark license agreement.",
        frame: "Frames",
        without:
          "Without prior approval and written permission, you may not create frames around our Web pages that alter in any way the visual presentation or appearance of our site.",
        limitation:
          "The limitation or exclusion of our or your liability for death or personal injury; The limitation or exclusion of our or your liability for fraud or fraudulent misrepresentation; Limiting any of our or your liabilities in any way that is not permitted under applicable law; or Exclude any of our or your liabilities that may not be excluded under applicable law. The limitations and exclusions of liability set out in this section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all obligations arising under this release, including contractual obligations, tort and breach of statutory duty.",
        site: "As long as the site and the information and services provided on the site are free, we will not be liable for any loss or damage of any nature.",
        content: "Responsibility for content",
        take: "We take no responsibility for the content that appears on your website. You agree to protect and defend us against all claims that arise on your website. No link(s) should appear on any Website that may be interpreted as libelous, obscene, criminal, or which infringes, tends to infringe, incites the infringement, or otherwise implies the violation of any third party rights.",
        right: "Reservation of rights",
        request:
          "We reserve the right to request that you remove all links or any specific link to our Website. You agree to immediately remove all links to our site upon our request. We also reserve the right to change these terms and conditions and our linking policy at any time. By continuing to link to our Website, you agree to comply with and follow these linking terms and conditions.",
        remove: "Remove links from our site",
        find: "If you find any link on our site that is offensive for any reason, please feel free to contact and report us at any time. We will consider requests to remove links, but we are not obligated to do so or respond to you directly.",
        acc: "We do not guarantee the accuracy of the information provided on this site, nor its completeness or accuracy; further, we make no promise that the site will remain available or that the materials on the site will be updated.",
        disc: "Disclaimer",
        max: "To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. This discharge does not contain:",
        draft:
          "Draft clear and comprehensive terms and conditions for your website. Include information about product pricing, shipping policies, return and refund policies, and any disclaimers. Clearly state the terms of use for visitors to your site.",
        create:
          "Create a privacy policy that outlines how you collect, use, and protect customer information. Address aspects like data storage, security measures, and whether you share information with third parties. Compliance with data protection laws such as GDPR (General Data Protection Regulation) is crucial.",
        payment: "Payment Card Industry Data Security Standard (PCI DSS):",
        handle:
          "If you handle credit card transactions, comply with PCI DSS standards to ensure the secure processing of payment information. This involves maintaining a secure network, protecting cardholder data, and regularly monitoring and testing systems.",
        electronic: "Electronic Commerce Regulations:",
        your: "Familiarize yourself with and adhere to electronic commerce regulations in your jurisdiction. These regulations may cover issues such as electronic contracts, electronic signatures, and consumer rights in online transactions.",
        protec: "Intellectual Property Protection:",
        ensure:
          "Ensure that you have the right to use any trademarks, copyrights, or intellectual property associated with your business. Respect the intellectual property rights of others, and consider registering your own trademarks if applicable.",
        acces: "Accessibility Compliance:",
        ensurethree:
          "Ensure that your website is accessible to individuals with disabilities, complying with accessibility standards such as the Americans with Disabilities Act (ADA) or the Web Content Accessibility Guidelines (WCAG).",
        showMore: "Show More",
        CartEmpty: "Your cart is empty. You can shop now from",
        here: "here",
        marketing: "Advertising and Marketing Laws:",
        abide:
          "Abide by advertising and marketing laws, including truth in advertising, anti-spam laws, and regulations related to online marketing practices.",
        if: "If your website uses cookies, disclose this information in a cookie policy. Comply with regulations related to cookie usage and obtain user consent where necessary.",
        law: "Dispute Resolution and Governing Law:",
        clearly:
          "Clearly specify the governing law and jurisdiction in case of disputes. Include information about how disputes will be resolved, such as through arbitration or litigation.",
        view: "view product",
        review: "review",
        write: "Write Your Review",
        currency: "MAD",
      },
      fr: {
        home: "Accueil",
        store: "Magasin",
        about: "A propos de nous",
        brand: "Marques internatio",
        blog: "Blog",
        contact: "Contactez nous",
        new: "quoi de neuf",
        discover: "Découvrez tout ce qui est nouveau",
        detailsbtn: "détails",
        links: "Liens importants",
        shipping:
          "Informations d'expédition Pour garantir que vos achats arrivent sans problème, assurez-vous de fournir",
        private: "Politique privée",
        cookies: "Politique de cookies",
        info: "Informations sur la livraison",
        contactP:
          "Contactez-nous pour toute demande de renseignements ou d'assistance dont vous avez besoin, nous sommes là pour vous fournir soutien et conseils",
        subscribe: "Abonnez-vous à AdobeXD par e-mail",
        login: "se connecter",
        register: "registre",
        newhere: "Nouveau ici ?",
        welcome:
          "Bienvenue, nous sommes heureux que vous ayez visité notre site Web",
        oneofus: "Un de nous",
        interested: "Vous pourriez également être intéressé par",
        track: "suivre les commandes",
        orders: "ordres",
        logout: "Se déconnecter",
        placed: "mis",
        process: "Traitement",
        shipped: "Expédié",
        deliver: "Livré",
        aboutParagraph:
          "Votre partenaire de confiance pour vos besoins en santé. Nous fournissons des produits de haute qualité et un service distingué pour assurer votre santé et votre confort. Apprenez à nous connaître et comment nous prenons soin de vous",
        buyabout: "Acheter maintenant",
        accuracy: "Haute précision",
        accuracyParagraph:
          "Une haute précision vous garantit une excellente expérience d'achat sur notre site e-commerce, car nous nous efforçons toujours de garantir la qualité de nos produits et l'exactitude de nos services",
        awards: "Prix",
        winners:
          "Gagnants de multiples prix, nous vous garantissons une expérience d'achat exceptionnelle sur notre site e-commerce, car nos services et produits se distinguent par l'excellence et la reconnaissance.",
        friends: "Vos amis",
        friendParagraph:
          "Nous sommes la place de vos amis dans le monde du commerce électronique, car nous vous proposons des produits et services qui vous offrent une expérience d'achat unique et fiable.",
        Fastshipping: "Expédition rapide",
        offer:
          "Nous offrons un service d'expédition rapide qui permet à vos produits de vous parvenir le plus rapidement possible, afin que vous puissiez profiter d'une expérience d'achat immédiate et confortable.",
        addresscontact: "l'adresse",
        addressdescontact:
          "LAAYOUNE : MADINAT EL WAHDA BLOC B NR 91 LAAYOUNE (M).",
        addressdescontacttwo:
          "Tetouan: Mezanine bloc B Bureau n 4 BOROUJ 16 Avenue des Far N° 873 Tétouan",
        hours: "Heures de travail",
        day: "Du lundi au vendredi : 7h - 19h",
        weekend: "Weekend: 10am - 5pm",
        phonenumber: "numéro de téléphone",
        email: "Email",
        contactform:
          "Vous êtes toujours invités à nous contacter pour toute question ou demande de renseignements sur nos services.",
        submitcontact: "soumettre un message",
        categories: "catégories",
        magasin: "Magasin",
        learnmore: "Apprenez-en davantage à travers nos catégories de produits",
        rating: "notation",
        price: "prix",
        category: "catégorie",
        AllCategories: "toutes catégories",
        addtocart: "Ajouter au panier",
        firstname: "Prénom",
        message: "message",
        save: "enregistrer",
        cancel: "Annuler",
        edit: "modifier",
        myorder: "Mes commandes",
        view: "Consultez et modifiez toutes vos commandes livrées et retournées en attente ici.",
        orderplaced: "Commande passée",
        totalorder: "Commande totale",
        totalprice: "prix total",
        confirm: "confirmer",
        change: "Changez votre mot de passe",
        choose:
          "Choisissez un mot de passe fort et ne le réutilisez pas pour d'autres comptes.",
        changing:
          "Changer votre mot de passe vous déconnectera de tous vos appareils. Vous devrez saisir votre nouveau mot de passe sur tous vos appareils.",
        newpass: "nouveau mot de passe",
        oldpass: "Mot de passe actuel",
        myprofile: "Mon profil",
        wishlist: "liste de souhaits",
        cart: "Chariot",
        changepass: "Changer le mot de passe",
        searchblog: "rechercher un blog",
        country: "pays",
        city: "ville",
        region: "région",
        street: "rue",
        zipcode: "code postal",
        all: "toute",
        experience:
          "Découvrez notre application pour une meilleure expérience mobile !",
        download:
          "Télécharger maintenant depuis l'App Store ou le Google Play Store.",
        aboutpro: "à propos de ce produit",
        productdet: "détails du produit",
        main: "Catégorie principale",
        sub: "Sub Category",
        action: "action",
        delete: "supprimer",
        confirmorder: "confirmer ",
        deleteadd: "Supprimer",
        addaddress: "ajouter une nouvelle adresse",
        saveadd: "Enregistrer l'adresse",
        orderstatus: "Statut de la commande",
        show: "Afficher les détails",
        hide: "masquer les détails",
        product: "Produit",
        quantity: "Quantité",
        unit: "Prix unitaire",
        total: "Prix total",
        clear: "Effacer les filtres",
        important: "liens importants",
        privacy: "politique de confidentialité",
        terms: "termes et conditions",
        information: "Informations sur la livraison",
        pfooter:
          "Informations d'expédition Pour garantir que vos achats arrivent sans problème, assurez-vous de fournir l'adresse et le numéro de téléphone corrects pour garantir une expérience d'achat pratique et efficace. Assurez-vous que vos informations d'expédition sont à jour, y compris les détails de l'adresse et le délai de livraison souhaité, pour vous assurer de recevoir votre commande rapidement et sans retards inutiles.",
        contactdetails: "coordonnées",
        require:
          "Contactez-nous pour toute demande de renseignements ou d'assistance dont vous avez besoin, nous sommes là pour vous fournir soutien et conseils",
        addfooterone: "LAAYOUNE : MADINAT EL WAHDA BLOC B NR 91 LAAYOUNE (M)",
        addfootertwo:
          "Tétouan : Mezanine bloc B Bureau n 4 BOROUJ 16 Avenue des Far N° 873 Tétouan",
        popular: "produits populaires",
        featured: "découvrez quels sont nos produits vedettes",
        submit: "soumettre",
        paiement: "Paiement à réception",
        personal:
          "Vos données personnelles seront utilisées pour traiter votre commande, soutenir votre expérience sur ce site Web et à d'autres fins décrites dans notre politique de confidentialité.",
        agree: "Je suis d'accord avec",
        and: "et",
        privacypolicy: "politique de confidentialité",
        termsand: "Conditions générales",
        welcometo: "Bienvenue à Et Vitapara!",
        adjust:
          "Les présentes conditions générales définissent les paramètres et réglages d'utilisation du site Vitapara, disponible à l'adresse : https://vitaparapharma.com/.",
        assume:
          "En accédant à ce site, nous supposons que vous acceptez ces termes et conditions. Ne continuez pas à utiliser Et Vitapara si vous n'acceptez pas tous les termes et conditions mentionnés sur cette page.",
        definition:
          "La définition suivante s'applique à ces termes et conditions, à la déclaration de confidentialité, à l'avis de non-responsabilité et à tous les accords : Le client, Vous fait référence à vous, la personne qui navigue sur ce site et accepte les termes et conditions de la société. La Société, Nous, fait référence à notre entreprise. Partie, Parties fait référence à la fois au client et à nous. Tous les termes se réfèrent à l'offre, l'acceptation et le paiement nécessaires pour mener à bien un processus d'assistance au client de la manière la plus appropriée, dans le but de satisfaire les besoins du client en ce qui concerne la fourniture des services de la société mentionnés, conformément à et sous réserve de la loi en vigueur. Toute utilisation des termes susmentionnés ou d'autres mots au singulier ou au pluriel, ou en utilisant des majuscules, et/ou lui/elle ou eux, est considérée comme interchangeable et se réfère donc à la même chose.",
        accessing:
          "Cookies Nous utilisons des cookies. En accédant à Et Vitapara, vous avez accepté l'utilisation de cookies conformément à la politique de confidentialité d'Et Vitapara.",
        most: "La plupart des sites web interactifs utilisent des cookies pour nous permettre de récupérer les détails de l'utilisateur pour chaque visite. Notre site utilise des cookies pour activer certaines fonctionnalités afin de faciliter la navigation pour les personnes qui visitent notre site web. Certains de nos partenaires affiliés/annonceurs peuvent également utiliser des cookies.",
        license:
          "Licence Sauf indication contraire, Et Vitapara et/ou ses concédants de licence détiennent les droits de propriété intellectuelle de tout le matériel présent sur Et Vitapara. Tous les droits de propriété intellectuelle sont réservés. Vous pouvez accéder à ceci depuis Et Vitapara pour votre usage personnel tout en respectant les restrictions énoncées dans ces termes et conditions.",
        mustnot: "Vous ne devez pas :",
        repuplish: "Republier le contenu de Et Vitapara.",
        sell: "Vendre, louer ou sous-licencier le contenu de Et Vitapara.",
        repro: "Reproduire, copier ou dupliquer le contenu de Et Vitapara.",
        distribute: "Distribuer le contenu de Et Vitapara.",
        agreement:
          "Cet accord prend effet à compter de sa date. Nos termes et conditions ont été créés avec l'aide d'un générateur gratuit de termes et conditions.",
        avail:
          "Les parties de ce site sont accessibles aux utilisateurs qui peuvent les publier et modifier les opinions et informations dans certaines zones du site. Et il ne filtre pas, n'édite pas, ne publie pas et ne voit pas les commentaires avant votre apparition sur le site. Les commentaires ne reflètent pas les points de vue et opinions des autres, de ces agents et/ou de leurs dossiers. Les commentaires reflètent les points de vue et opinions de la personne qui publie ses propres points de vue et opinions. Avec l'autorisation appropriée du site, il ne sera pas possible de répondre aux commentaires ni à toutes responsabilités, dommages ou espaces de stockage et/ou soumis à la suite d'applications et/ou à la publication et/ou à l'apparition.",
        reserve:
          "Et Vitapara se réserve le droit de surveiller tous les commentaires et de supprimer tout commentaire qui pourrait être considéré comme inapproprié, offensant ou en violation de ces termes et conditions.",
        you: "Vous garantissez et déclarez que :",
        comment:
          "Les commentaires ne violent aucun droit de propriété intellectuelle, y compris sans limitation les droits d'auteur, brevets ou marques déposées d'un tiers ;",
        les: "Les commentaires ne contiennent aucun matériel diffamatoire, offensant, injurieux, inapproprié ou illégal constituant une violation de la vie privée ;",
        lestwo:
          "Les commentaires ne seront pas utilisés pour solliciter ou promouvoir des affaires ou des coutumes, ou pour mener des activités commerciales ou illégales.",
        grant:
          "Par la présente, vous accordez à Et Vitapara une licence non exclusive pour utiliser, reproduire, éditer et autoriser d'autres à utiliser, reproduire et éditer n'importe lequel de vos commentaires sous n'importe quelle forme, format ou médium.",
        hyper: "Le lien hypertexte vers notre contenu",
        may: "Les organisations suivantes peuvent créer un lien vers notre site web sans autorisation écrite préalable :",
        agenc: "Les agences gouvernementales ;",
        search: "Les moteurs de recherche ;",
        press: "Les organismes de presse ;",
        online:
          "Les distributeurs d'annuaires en ligne peuvent créer un lien vers notre site de la même manière qu'ils le font vers les sites web d'autres entreprises répertoriées ; et",
        Systematic:
          "Les entreprises accréditées au niveau du système à l'exception des organisations à but non lucratif sollicitant des dons, des centres commerciaux caritatifs, et des groupes collectant des dons caritatifs qui ne peuvent pas créer un lien vers notre site web.",
        these:
          "Ces organisations peuvent créer un lien vers notre page d'accueil, nos publications ou d'autres informations sur le site web tant que le lien : (a) n'est en aucun cas trompeur ; (b) n'implique pas à tort le parrainage, l'approbation ou l'approbation de la partie liée et de ses produits et/ou services ; et (c) convient au contexte du site de la partie liée.",
        cons: "Nous pourrions considérer et approuver d'autres demandes de liaison provenant des types d'organisations suivants :",
        know: "sources d'information connues des consommateurs et/ou des entreprises ;",
        dotcom: "sites communautaires dot.com ;",
        group:
          "associations ou autres groupes représentant des œuvres caritatives ;",
        electronic: "distributeurs d'annuaires électroniques ;",
        portals: "portails électroniques ;",
        account: "cabinets de comptabilité, de droit et de conseil ; et",
        education:
          "établissements d'enseignement et associations commerciales.",
        approve:
          "Nous approuverons les demandes de liens soumises par ces organisations si nous décidons ce qui suit : (a) Le lien ne nous fera pas apparaître de manière négative à nos yeux ou à ceux de nos entreprises accréditées ; (b) L'organisation n'a pas d'antécédents négatifs avec nous ; (c) L'avantage que nous retirons de la visibilité du lien hypertexte compense l'absence d'Et Vitapara ; (d) Le lien se trouve dans le contexte des ressources d'information générale.",
        long: "Ces organisations peuvent créer un lien vers notre page d'accueil tant que le lien : (a) n'est en aucune manière trompeur ; (b) ne suggère pas faussement une sponsorship ou une approbation de la part de l'entité liée, ou de ses produits ou services ; (c) convient au contexte du site de l'entité liée.",
        among:
          "Si vous faites partie des organisations mentionnées au paragraphe 2 ci-dessus et que vous souhaitez créer un lien vers notre site web, vous devez nous en informer en envoyant un courriel à Et Vitapara. Veuillez inclure votre nom, le nom de votre organisation, vos coordonnées ainsi que l'URL de votre site, une liste des URLs à partir desquelles vous envisagez de créer un lien vers notre site web, et une liste des URLs de notre site auxquelles vous souhaitez être lié. Attendez une réponse pendant 2 à 3 semaines.",
        maytwo:
          "Les organisations approuvées peuvent créer des liens vers notre site web de la manière suivante :",
        using:
          "En utilisant notre nom commercial ; ou En utilisant l'URL uniforme auquel il est lié ; ou En utilisant toute autre description de notre site web vers lequel il est lié, qui est logique dans le contexte et le format du contenu sur le site de la partie créant le lien.Il n'est pas autorisé d'utiliser le logo d'Et Vitapara ou toute autre œuvre d'art pour créer un lien en l'absence d'un accord de licence de marque déposée.",
        frame: "Encadrements",
        without:
          "Sans autorisation préalable et permission écrite, vous n'êtes pas autorisé à créer des cadres autour de nos pages Web qui modifient de quelque manière que ce soit la présentation visuelle ou l'apparence de notre site.",
        limitation:
          "La limitation ou l'exclusion de notre responsabilité ou de votre responsabilité pour décès ou blessures corporelles; La limitation ou l'exclusion de notre responsabilité ou de votre responsabilité pour fraude ou fausse déclaration frauduleuse; La limitation de l'une de nos responsabilités ou de vos responsabilités de toute manière non autorisée par la loi applicable; ou Exclure l'une de nos responsabilités ou de vos responsabilités qui ne peut être exclue conformément à la loi applicable. Les limites et exclusions de responsabilité énoncées dans cette section et ailleurs dans cette décharge : (a) sont soumises au paragraphe précédent ; et (b) régissent toutes les obligations découlant de cette décharge, y compris les obligations contractuelles, la responsabilité délictuelle et la violation d'une obligation légale.",
        site: "Tant que le site, les informations et les services fournis sur le site sont gratuits, nous ne serons pas responsables de toute perte ou dommage de quelque nature que ce soit.",
        content: "Responsabilité du contenu ",
        take: "Nous ne prendrons aucune responsabilité pour le contenu qui apparaît sur votre site web. Vous acceptez de nous protéger et de nous défendre contre toutes les revendications qui surviennent sur votre site web. Aucun lien ne doit apparaître sur un site web qui pourrait être interprété comme diffamatoire, obscène, criminel, ou qui viole, tend à violer, incite à la violation ou implique une autre violation des droits de tout tiers.",
        right: "Réservation des droits",
        request:
          "Nous nous réservons le droit de vous demander de retirer tous les liens ou tout lien spécifique vers notre site Web. Vous acceptez de retirer immédiatement tous les liens vers notre site à notre demande. Nous nous réservons également le droit de modifier ces termes et conditions et notre politique de liens à tout moment. En continuant à lier à notre site Web, vous acceptez de respecter et de suivre ces termes et conditions de lien.",
        remove: "Retirer les liens de notre site",
        find: "Si vous trouvez un lien sur notre site qui est offensant pour une raison quelconque, n'hésitez pas à nous contacter et à nous en informer à tout moment. Nous considérerons les demandes de suppression de liens, mais nous ne sommes pas obligés de le faire ou de vous répondre directement.",
        acc: "Nous ne garantissons pas l'exactitude des informations fournies sur ce site, ni leur exhaustivité ou leur précision; de plus, nous ne promettons pas que le site restera disponible ou que les matériaux présents sur le site seront mis à jour.",
        disc: "Désistement",
        max: "Dans la mesure permise par la loi applicable, nous excluons toutes représentations, garanties et conditions relatives à notre site web et à l'utilisation de ce site. Cette décharge ne contient pas :",
        draft:
          "Rédigez des conditions générales claires et complètes pour votre site Web. Incluez des informations sur le prix des produits, les politiques d'expédition, les politiques de retour et de remboursement et toute clause de non-responsabilité. Énoncez clairement les conditions d’utilisation pour les visiteurs de votre site.",
        create:
          "Créez une politique de confidentialité qui décrit la manière dont vous collectez, utilisez et protégez les informations client. Abordez des aspects tels que le stockage des données, les mesures de sécurité et la question de savoir si vous partagez des informations avec des tiers. Le respect des lois sur la protection des données telles que le RGPD (Règlement Général sur la Protection des Données) est crucial.",
        payment:
          "Norme de sécurité des données du secteur des cartes de paiement (PCI DSS) :",
        handle:
          "Si vous traitez des transactions par carte de crédit, respectez les normes PCI DSS pour garantir le traitement sécurisé des informations de paiement. Cela implique de maintenir un réseau sécurisé, de protéger les données des titulaires de carte et de surveiller et tester régulièrement les systèmes.",
        electronic: "Règlements sur le commerce électronique :",
        your: "Familiarisez-vous avec et respectez les réglementations en matière de commerce électronique dans votre juridiction. Ces réglementations peuvent couvrir des questions telles que les contrats électroniques, les signatures électroniques et les droits des consommateurs dans les transactions en ligne.",
        protec: "Protection de la propriété intellectuelle:",
        ensure:
          "Assurez-vous que vous avez le droit d’utiliser les marques commerciales, les droits d’auteur ou la propriété intellectuelle associés à votre entreprise. Respectez les droits de propriété intellectuelle d’autrui et envisagez d’enregistrer vos propres marques, le cas échéant.",
        acces: "Conformité en matière d'accessibilité :",
        ensurethree:
          "Assurez-vous que votre site Web est accessible aux personnes handicapées, en respectant les normes d'accessibilité telles que l'Americans with Disabilities Act (ADA) ou les Web Content Accessibility Guidelines (WCAG).",
        showMore: "montre plus",
        CartEmpty:
          "Votre panier est vide. Vous pouvez magasiner dès maintenant à partir de",
        here: "ici",
        marketing: "Lois sur la publicité et le marketing :",
        abide:
          "Respectez les lois sur la publicité et le marketing, y compris la vérité en matière de publicité, les lois anti-spam et les réglementations liées aux pratiques de marketing en ligne.",
        if: "Si votre site Web utilise des cookies, divulguez ces informations dans une politique en matière de cookies. Se conformer aux réglementations liées à l'utilisation des cookies et obtenir le consentement de l'utilisateur si nécessaire.",
        law: "Règlement des différends et loi applicable :",
        clearly:
          "Précisez clairement la loi applicable et la juridiction en cas de litige. Incluez des informations sur la manière dont les litiges seront résolus, par exemple par arbitrage ou litige.",
        view: "Voir le produit",
        review: "revoir",
        write: "Donnez votre avis",
        currency: "MAD",
      },
      ar: {
        home: "الرئيسيه",
        store: "المتجر",
        about: "معلومات عنا",
        brand: "ماركات عالمية",
        blog: "المدونه",
        contact: "تواصل معنا",
        new: "ما الجديد",
        new: "اكتشف كل ما هو جديد",
        detailsbtn: "تفاصيل",
        links: "روابط مهمه",
        shipping:
          "معلومات الشحن لضمان وصول مشترياتك بأمان، يرجى التأكد من تقديمها",
        private: "سياسة خاصة",
        cookies: "اتفاقيات تعريف الارتباط",
        info: "معلومات التوصيل",
        contactP:
          "اتصل بنا للحصول على أية استفسارات أو مساعدة تحتاجها، فنحن هنا لتقديم الدعم والمشورة",
        subscribe: "اشترك في AdobeXD عبر البريد الإلكتروني",
        login: "تسجيل دخول",
        register: "انشاء حساب",
        newhere: "جديد هنا ؟",
        welcome: "مرحباً بك، نحن سعداء بزيارتك لموقعنا",
        oneofus: "واحد منا",
        interested: "قد تكون أيضا مهتما ب",
        track: "تتبع الطلب",
        orders: "طلبات",
        logout: "تسجيل خروج",
        placed: "تم الطلب",
        process: "معالجه",
        shipped: "تم الشحن",
        deliver: "تسليم",
        aboutParagraph:
          "شريكك الموثوق به لتلبية احتياجاتك الصحية. نحن نقدم منتجات عالية الجودة وخدمة متميزة لضمان صحتك وراحتك. تعرف علينا وكيف نهتم بك",
        buyabout: "اشترى الان",
        accuracy: "دقة عالية",
        accuracyParagraph:
          "الدقة العالية تضمن لك تجربة تسوق ممتازة على موقع التجارة الإلكترونية الخاص بنا، كما نسعى دائمًا لضمان جودة منتجاتنا ودقة خدماتنا",
        awards: " مكافأت",
        winners:
          "الفائزون بجوائز متعددة، نضمن لكم تجربة تسوق استثنائية على موقعنا للتجارة الإلكترونية، حيث تتميز خدماتنا ومنتجاتنا بالتميز والتقدير",
        friends: "أصدقاء لك",
        friendParagraph:
          "نحن مكان أصدقائك في عالم التجارة الإلكترونية حيث نقدم لك منتجات وخدمات تمنحك تجربة تسوق فريدة وموثوقة",
        Fastshipping: "شحن سريع",
        offer:
          "نحن نقدم خدمة شحن سريعة تجعل منتجاتك تصل إليك في أسرع وقت ممكن، لتستمتع بتجربة تسوق فورية ومريحة",
        addresscontact: "العنوان",
        addressdescontact:
          "LAAYOUNE : MADINAT EL WAHDA BLOC B NR 91 LAAYOUNE (M).",
        addressdescontacttwo:
          "Tetouan: Mezanine bloc B Bureau n 4 BOROUJ 16 Avenue des Far N° 873 Tétouan",
        hours: "ساعات العمل",
        day: "من الاثنين إلى الجمعة: 7 صباحًا - 7 مساءً",
        weekend: " نهاية الأسبوع: 10 صباحًا - 5 مساءً",
        phonenumber: "رقم الهاتف",
        email: "بريد الكتروني",
        contactform:
          "نرحب دائمًا باتصالك بنا لطرح الأسئلة والاستفسار عن خدماتنا.",
        submitcontact: "ارسال",
        categories: "فئات",
        magasin: "متجر",
        learnmore: "تعلم المزيد من خلال فئات منتجاتنا",
        rating: "تقييم",
        price: "سعر",
        category: "فئه",
        AllCategories: "جميع الفئات",
        addtocart: "أضف إلى السلة",
        firstname: " إسمك",
        message: "رساله",
        save: "حفظ",
        cancel: "الغاء",
        edit: "تعديل",
        myorder: "طلباتي",
        view: "قم بعرض وتحرير كافة طلباتك المعلقة التي تم تسليمها وإرجاعها هنا",
        orderplaced: "تم تقديم الطلب",
        totalorder: "الطلب الإجمالي",
        totalprice: "السعر الكلي",
        confirm: "تأكيد",
        change: "تغيير كلمة المرور الخاصة بك",
        choose: "اختر كلمة مرور قوية ولا تعيد استخدامها لحسابات أخرى",
        changing:
          "سيؤدي تغيير كلمة المرور إلى تسجيل خروجك من جميع أجهزتك. ستحتاج إلى إدخال كلمة المرور الجديدة على جميع أجهزتك",
        newpass: "كلمة السر الجديده",
        oldpass: "كلمة السر الحاليه",
        myprofile: "ملفي الشخصي",
        wishlist: "قائمة الرغبات",
        cart: "عربة التسوق",
        changepass: "تغيير كلمة المرور",
        searchblog: "بحث",
        country: "دولة",
        city: "مدينه",
        region: "منطقه",
        street: "شارع",
        zipcode: "الرمز البريدي",
        all: "كل",
        experience: "جرّب تطبيقنا للحصول على تجربة أفضل على الهاتف المحمول",
        download: "قم بالتنزيل الآن من App Store أو Google Play Store.",
        aboutpro: "حول هذا المنتج",
        productdet: "تفاصيل المنتج",
        main: "الفئة الرئيسية",
        sub: "تصنيف فرعي",
        action: "تأكيد",
        delete: "مسح",
        confirmorder: "تأكيد ",
        deleteadd: "احذف",
        addaddress: "أضف عنوانًا جديدًا",
        saveadd: "حفظ",
        orderstatus: "حالة الطلب",
        show: "اظهار التفاصيل",
        hide: "اخفاء التفاصيل",
        product: "المنتج",
        quantity: "الكميه",
        unit: "سعر الوحدة",
        total: "السعر الإجمالي",
        clear: "كل",
        important: "روابط هامه",
        privacy: "سياسة الخصوصية",
        terms: "الشروط والأحكام",
        information: "معلومات حول التسليم",
        pfooter:
          "معلومات الشحن لضمان وصول مشترياتك بأمان، يرجى التأكد من تقديم العنوان ورقم الهاتف الصحيحين لضمان تجربة تسوق مريحة وفعالة. تأكد من تحديث معلومات الشحن الخاصة بك، بما في ذلك تفاصيل العنوان ووقت التسليم المطلوب، لضمان استلام طلبك بسرعة ودون تأخير غير ضروري.",
        contactdetails: "معلومات شخصية",
        require:
          "اتصل بنا للحصول على أية استفسارات أو مساعدة تحتاجها، فنحن هنا لتقديم الدعم والمشورة",
        addfooterone: "العيون: مدينة الوحدة قطعة ب رقم 91 العيون (م)",
        addfootertwo:
          "تطوان: الميزانين كتلة ب مكتب رقم 4 البروج 16 شارع الأقصى رقم 873 تطوان",
        popular: "المنتجات الشعبية",
        featured: "اكتشف ما هي منتجاتنا المميزة",
        submit: "ارسال",
        paiement: "الدفع عند الاستلام",
        personal:
          "سيتم استخدام بياناتك الشخصية لمعالجة طلبك، ودعم تجربتك عبر هذا الموقع، ولأغراض أخرى موضحة في سياسة الخصوصية الخاصة بنا",
        agree: "أوافق على الشروط والأحكام وسياسة الخصوصية",
        and: "و",

        privacypolicy: "سياسة الخصوصية",
        termsand: "الشروط عامة",
        welcometo: "مرحبا بك في Vitapara!",
        adjust:
          "تحدد هذه الشروط والأحكام القواعد واللوائح الخاصة باستخدام موقع Et Vitapara، المتاح على: https://vitaparapharma.com/.",
        assume:
          "عند دخولك إلى هذا الموقع، نفترض أنك تقبل هذه الشروط والأحكام. لا تستمر في استخدام Et Vitapara إذا لم تقبل جميع الشروط والأحكام المذكورة في هذه الصفحة.",
        definition:
          "ينطبق التعريف التالي على هذه الشروط والأحكام وبيان الخصوصية وإشعار إخلاء المسؤولية وجميع الاتفاقيات: العميل، أنت تشير إليك، الشخص الذي يتصفح هذا الموقع وتقبل شروط وأحكام الشركة. الشركة، نحن، تشير إلى أعمالنا. الطرف، الأطراف تشير إلى كل من العميل ونحن. تشير جميع الشروط إلى العرض والقبول والدفع اللازم لتنفيذ عملية المساعدة للعميل بالطريقة الأنسب، بهدف تلبية احتياجات العميل فيما يتعلق بتقديم خدمات الشركة المذكورة، وفقًا وموضوعًا. للقانون المعمول به. أي استخدام للمصطلحات المذكورة أعلاه أو كلمات أخرى بصيغة المفرد أو الجمع، أو باستخدام الحروف الكبيرة و/أو هو/هي أو هم، تعتبر قابلة للتبديل وبالتالي تشير إلى نفس الشيء.",
        accessing:
          "ملفات تعريف الارتباط نحن نستخدم ملفات تعريف الارتباط. من خلال الوصول إلى Et Vitapara، فإنك قد قبلت استخدام ملفات تعريف الارتباط وفقًا لسياسة الخصوصية الخاصة بـ Et Vitapara.",
        most: "تستخدم معظم مواقع الويب التفاعلية ملفات تعريف الارتباط للسماح لنا باسترداد تفاصيل المستخدم لكل زيارة. يستخدم موقعنا ملفات تعريف الارتباط لتمكين ميزات معينة لتسهيل التنقل للأشخاص الذين يزورون موقعنا. قد يستخدم بعض شركائنا التابعين/المعلنين أيضًا ملفات تعريف الارتباط.",
        license:
          "الترخيص ما لم ينص على خلاف ذلك، تمتلك Et Vitapara و/أو الجهات المرخصة لها حقوق الملكية الفكرية لجميع المواد الموجودة على Et Vitapara. جميع حقوق الملكية الفكرية محفوظة. يمكنك الوصول إلى هذا من Et Vitapara لاستخدامك الشخصي مع مراعاة القيود المنصوص عليها في هذه الشروط والأحكام.",
        mustnot: "لا يجب عليكم :",
        repuplish: "إعادة نشر المحتوى من Et Vitapara.",
        sell: "بيع أو تأجير أو ترخيص المحتوى من الباطن من Et Vitapara.",
        repro: "إعادة إنتاج أو نسخ أو تكرار محتوى Et Vitapara.",
        distribute: "توزيع محتوى Et Vitapara.",
        agreement:
          "هذا الاتفاق يؤثر على حساب التاريخ. تم إنشاء الشروط والأحكام بمساعدة مُنشئ مجاني للشروط والأحكام.",
        avail:
          "توفر أجزاء من هذا الموقع الفرصة للمستخدمين لنشر وتبادل الآراء والمعلومات في مناطق معينة من الموقع. ولا تقوم Vitapara بتصفية التعليقات أو تحريرها أو نشرها أو مراجعتها قبل ظهورها على الموقع. التعليقات لا تعكس آراء وآراء Et Vitapara ووكلائها و/أو الشركات التابعة لها. تعكس التعليقات آراء وآراء الشخص الذي ينشر وجهات نظره وآرائه. إلى الحد الذي يسمح به القانون المعمول به، لن تكون Et Vitapara مسؤولة عن التعليقات أو عن أي مسؤولية أو أضرار أو نفقات ناجمة و/أو متكبدة نتيجة لأي استخدام و/أو نشر و/أو ظهور التعليقات على هذا الموقع. ",
        reserve:
          "وتحتفظ Vitapara بالحق في مراقبة جميع التعليقات وإزالة أي تعليقات يمكن اعتبارها غير لائقة أو مسيئة أو تنتهك هذه الشروط والأحكام.",
        you: "أنت تضمن وتعلن:",
        comment:
          "لا تنتهك التعليقات أي حق من حقوق الملكية الفكرية، بما في ذلك على سبيل المثال لا الحصر حقوق الطبع والنشر أو براءة الاختراع أو العلامة التجارية لأي طرف ثالث؛",
        les: "لا تحتوي التعليقات على أي مواد تشهيرية أو مسيئة أو مسيئة أو غير لائقة أو غير قانونية والتي تشكل انتهاكًا للخصوصية؛",
        lestwo:
          "لن يتم استخدام التعليقات لطلب أو الترويج للأعمال أو العرف، أو للمشاركة في نشاط تجاري أو غير قانوني.",
        grant:
          "أنت بموجب هذا تمنح Et Vitapara ترخيصًا غير حصري لاستخدام وإعادة إنتاج وتحرير وتفويض الآخرين لاستخدام وإعادة إنتاج وتحرير أي من تعليقاتك في أي وجميع الأشكال أو التنسيقات أو الوسائط.",
        hyper: "الارتباط التشعبي للمحتوى الخاص بنا",
        may: "قد ترتبط المنظمات التالية بموقعنا الإلكتروني دون الحصول على إذن كتابي مسبق:",
        agenc: "وكالات الحكومة؛",
        search: "محركات البحث؛",
        press: "المنظمات الصحفية؛",
        online:
          "قد يرتبط موزعو الدليل عبر الإنترنت بموقعنا بنفس الطريقة التي يرتبطون بها بالمواقع الإلكترونية للشركات الأخرى المدرجة؛ ",
        Systematic:
          "الشركات المعتمدة بشكل منهجي باستثناء المنظمات غير الربحية التي تطلب التبرعات ومراكز التسوق الخيرية والمجموعات التي تجمع التبرعات الخيرية والتي قد لا ترتبط بموقعنا على الويب.",
        these:
          "قد ترتبط هذه المنظمات بصفحتنا الرئيسية أو منشوراتنا أو معلومات موقع الويب الأخرى طالما أن الرابط: (أ) ليس مضللاً بأي شكل من الأشكال؛ (ب) لا يعني بشكل خاطئ رعاية أو تأييد أو موافقة الطرف المرتبط ومنتجاته و/أو خدماته؛ و (ج) مناسب لسياق موقع الطرف المرتبط.",
        cons: "يجوز لنا النظر في طلبات الارتباط الأخرى والموافقة عليها من الأنواع التالية من المؤسسات:",
        know: "مصادر المعلومات المعروفة للمستهلكين و/أو الشركات؛",
        dotcom: "مواقع مجتمع dot.com؛",
        group: "الجمعيات أو المجموعات الأخرى التي تمثل الأعمال الخيرية؛",
        electronic: "موزعو الدليل الإلكتروني؛",
        portals: "البوابات الإلكترونية",
        account: "شركات المحاسبة والقانون والاستشارات؛ و",
        education: "المؤسسات التعليمية والجمعيات التجارية.",
        approve:
          "سنوافق على طلبات الارتباط المقدمة من هذه المنظمات إذا قررنا ما يلي: (أ) الرابط لن يجعلنا نبدو غير ملائمين لنا أو لشركاتنا المعتمدة؛ (ب) ليس للمنظمة أي تاريخ سلبي معنا؛ (ج) الفائدة التي نكتسبها من رؤية الارتباط التشعبي تعوض غياب Et Vitapara؛ (د) الرابط في سياق موارد المعلومات العامة.",
        long: "قد ترتبط هذه المنظمات بصفحتنا الرئيسية طالما أن الرابط: (أ) ليس مضللاً بأي شكل من الأشكال؛ (ب) لا يعني بشكل خاطئ رعاية أو تأييد الكيان المرتبط أو منتجاته أو خدماته؛ (ج) يكون مناسبًا لسياق موقع الكيان المرتبط.",
        among:
          "إذا كنت من بين المنظمات المذكورة في الفقرة 2 أعلاه وكنت مهتمًا بالارتباط بموقعنا الإلكتروني، فيجب عليك إبلاغنا عن طريق إرسال بريد إلكتروني إلى Et Vitapara. يرجى تضمين اسمك، واسم مؤسستك، ومعلومات الاتصال بالإضافة إلى عنوان URL الخاص بموقعك، وقائمة بأي عناوين URL تخطط للربط منها بموقعنا على الويب، وقائمة بعناوين URL الموجودة على موقعنا والتي ترغب في الارتباط بها مرتبط. انتظر 2-3 أسابيع للرد.",
        maytwo:
          "يجوز للمنظمات المعتمدة الارتباط بموقعنا الإلكتروني بالطريقة التالية:",
        using:
          "باستخدام اسم أعمالنا؛ أو باستخدام عنوان URL الموحد الذي يرتبط به؛ أو عن طريق استخدام أي وصف آخر لموقعنا الإلكتروني المرتبط به، يكون ذلك منطقيًا ضمن سياق وتنسيق المحتوى على موقع الطرف المرتبط. لا يجوز لك استخدام شعار Et Vitapara أو أي عمل فني آخر للربط في غياب اتفاقية ترخيص العلامة التجارية.",
        frame: "إطارات",
        without:
          "بدون موافقة مسبقة وإذن كتابي، لا يجوز لك إنشاء إطارات حول صفحات الويب الخاصة بنا والتي تغير بأي شكل من الأشكال العرض المرئي أو مظهر موقعنا.",
        limitation:
          "تقييد أو استبعاد مسؤوليتنا أو مسؤوليتك عن الوفاة أو الإصابة الشخصية؛ تقييد أو استبعاد مسؤوليتنا أو مسؤوليتك عن الاحتيال أو التحريف الاحتيالي؛ الحد من أي من التزاماتنا أو التزاماتك بأي طريقة غير مسموح بها بموجب القانون المعمول به؛ أو استبعاد أي من التزاماتنا أو التزاماتك التي قد لا يتم استبعادها بموجب القانون المعمول به. القيود والاستثناءات من المسؤولية المنصوص عليها في هذا القسم وفي أي مكان آخر في إخلاء المسؤولية هذا: (أ) تخضع للفقرة السابقة؛ و(ب) تحكم جميع الالتزامات الناشئة بموجب هذا الإصدار، بما في ذلك الالتزامات التعاقدية والضرر وخرق الواجب القانوني.",
        site: "وطالما أن الموقع والمعلومات والخدمات المقدمة في الموقع مجانية، فإننا لن نكون مسؤولين عن أي خسارة أو ضرر من أي نوع.",
        content: "المسؤولية عن المحتوى ",
        take: "نحن لا نتحمل أي مسؤولية عن المحتوى الذي يظهر على موقع الويب الخاص بك. أنت توافق على حمايتنا والدفاع عنا ضد جميع المطالبات التي تنشأ على موقع الويب الخاص بك. لا ينبغي أن يظهر أي رابط (روابط) على أي موقع ويب يمكن تفسيره على أنه تشهير أو فاحش أو إجرامي أو ينتهك أو يميل إلى الانتهاك أو يحرض على الانتهاك أو يتضمن انتهاك حقوق أي طرف ثالث.",
        right: "حجز الحقوق",
        request:
          "نحن نحتفظ بالحق في أن نطلب منك إزالة جميع الروابط أو أي رابط محدد لموقعنا الإلكتروني. أنت توافق على إزالة جميع الروابط إلى موقعنا فورًا بناءً على طلبنا. نحتفظ أيضًا بالحق في تغيير هذه الشروط والأحكام وسياسة الارتباط الخاصة بنا في أي وقت. من خلال الاستمرار في الارتباط بموقعنا الإلكتروني، فإنك توافق على الالتزام بشروط وأحكام الارتباط هذه واتباعها.",
        remove: "إزالة الروابط من موقعنا",
        find: "إذا وجدت أي رابط على موقعنا مسيء لأي سبب من الأسباب، فلا تتردد في الاتصال بنا والإبلاغ عنه في أي وقت. سننظر في طلبات إزالة الروابط، ولكننا غير ملزمين بذلك أو بالرد عليك مباشرة.",
        acc: "نحن لا نضمن دقة المعلومات المقدمة على هذا الموقع، ولا اكتمالها أو دقتها؛ علاوة على ذلك، فإننا لا نقدم أي وعد بأن الموقع سيظل متاحًا أو سيتم تحديث المواد الموجودة على الموقع.",
        disc: "تنصل",
        max: "إلى الحد الأقصى الذي يسمح به القانون المعمول به، نستبعد جميع الإقرارات والضمانات والشروط المتعلقة بموقعنا الإلكتروني واستخدام هذا الموقع. لا يحتوي هذا التفريغ على:",
        draft:
          "قم بصياغة شروط وأحكام واضحة وشاملة لموقعك على الويب. قم بتضمين معلومات حول أسعار المنتجات وسياسات الشحن وسياسات الإرجاع واسترداد الأموال وأي إخلاء مسؤولية. اذكر بوضوح شروط الاستخدام لزوار موقعك.",
        create:
          "قم بإنشاء سياسة خصوصية توضح كيفية جمع معلومات العملاء واستخدامها وحمايتها. تناول جوانب مثل تخزين البيانات، والتدابير الأمنية، وما إذا كنت تشارك المعلومات مع أطراف ثالثة. يعد الامتثال لقوانين حماية البيانات مثل اللائحة العامة لحماية البيانات (GDPR) أمرًا بالغ الأهمية.",
        payment: "معيار أمان بيانات صناعة بطاقات الدفع (PCI DSS):",
        handle:
          "إذا كنت تتعامل مع معاملات بطاقة الائتمان، فالتزم بمعايير PCI DSS لضمان المعالجة الآمنة لمعلومات الدفع. يتضمن ذلك الحفاظ على شبكة آمنة، وحماية بيانات حامل البطاقة، ومراقبة الأنظمة واختبارها بانتظام.",
        electronic: "ضوابط التجارة الإلكترونية:",
        your: "تعرف على لوائح التجارة الإلكترونية في ولايتك القضائية والتزم بها. قد تغطي هذه اللوائح قضايا مثل العقود الإلكترونية والتوقيعات الإلكترونية وحقوق المستهلك في المعاملات عبر الإنترنت",
        protec: "حماية الملكية الفكرية:",
        ensure:
          "تأكد من أن لديك الحق في استخدام أي علامات تجارية أو حقوق نشر أو ملكية فكرية مرتبطة بعملك. احترم حقوق الملكية الفكرية للآخرين، وفكر في تسجيل العلامات التجارية الخاصة بك إن أمكن.",
        acces: "الامتثال لإمكانية الوصول:",
        ensurethree:
          "تأكد من أن موقع الويب الخاص بك متاح للأشخاص ذوي الإعاقة، بما يتوافق مع معايير إمكانية الوصول مثل قانون الأمريكيين ذوي الإعاقة (ADA) أو إرشادات إمكانية الوصول إلى محتوى الويب (WCAG).",

        showMore: "أظهر المزيد",
        CartEmpty: "عربة التسوق فارغة. يمكنك التسوق الآن من",
        here: "هنا",
        marketing: "قوانين الإعلان والتسويق:",
        abide:
          "الالتزام بقوانين الإعلان والتسويق، بما في ذلك الحقيقة في الإعلان، وقوانين مكافحة البريد العشوائي، واللوائح المتعلقة بممارسات التسويق عبر الإنترنت.",
        if: "إذا كان موقع الويب الخاص بك يستخدم ملفات تعريف الارتباط، فقم بالكشف عن هذه المعلومات في سياسة ملفات تعريف الارتباط. الالتزام باللوائح المتعلقة باستخدام ملفات تعريف الارتباط والحصول على موافقة المستخدم عند الضرورة.",
        law: "حل النزاعات والقانون الحاكم:",
        clearly:
          "حدد بوضوح القانون الحاكم والاختصاص القضائي في حالة النزاعات. قم بتضمين معلومات حول كيفية حل النزاعات، مثل التحكيم أو التقاضي.",
        view: "عرض المنتج",
        review: "تعليق",
        write: "اكتب تعليق",
        currency:"د.م"
      },
    },
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      state.direction = action.payload === "ar" ? "rtl" : "ltr";
    },
  },
});

export const { setLanguage } = translationSlice.actions;

export const selectLanguage = (state) => state.translation.language;
export const selectTranslations = (state) => state.translation.translations;

export default translationSlice.reducer;
