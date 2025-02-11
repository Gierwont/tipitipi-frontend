const About = () => {
  return (
    <div className="globalCss">
      <h1 className="text-5xl mt-[1%]">O nas</h1>
      {/* <ul className="mt-5">
        <li className="text-xl pt-5">
          <b className="text-3xl">Historia fundacji:</b> Krótkie opowiadanie o
          tym, jak i dlaczego powstała fundacja, co ją napędza, jakie problemy
          próbuje rozwiązać.
        </li>
        <li className="text-xl pt-5">
          <b className="text-3xl">Misja i Wartości:</b> Podkreśl główne cele i
          wartości fundacji, takie jak pomoc społeczna, ochrona środowiska,
          edukacja, itp.
        </li>
        <li className="text-xl pt-5">
          <b className="text-3xl">Zespół:</b> Przedstawienie członków zespołu.
          Krótkie biografie z ich zdjęciami, funkcjami i być może osobistym
          cytatem, dlaczego pracują w fundacji.
        </li>
        <li className="text-xl pt-5">
          <b className="text-3xl">Współpraca:</b> Jeśli fundacja współpracuje z
          innymi organizacjami lub ma partnerów, opisz te relacje.
        </li>
      </ul> */}
      {/* <ul className="list-disc pl-5 mt-5">
        <li className="text-xl pt-5">
          Od lat tworzymy niezapomniane chwile dla dzieci, organizując animacje
          zarówno w naszej sali zabaw, jak i poza nią. Obsługujemy komunie,
          wesela, imprezy okolicznościowe oraz duże eventy, zapewniając
          profesjonalną opiekę i świetną zabawę.
        </li>
        <li className="text-xl pt-5">
          Nasza kadra to młode, pełne energii i doskonale przeszkolone
          animatorki, które mają ogromne serce do pracy z dziećmi i głowy pełne
          kreatywnych pomysłów. Co nas wyróżnia? Jako jedyni w okolicy oferujemy
          gry wielkoformatowe oraz niezwykle bogaty program animacyjny.
        </li>
        <li className="text-xl pt-5">
          Nasi animatorzy to nie przypadkowe osoby - wszyscy posiadają
          odpowiednie kwalifikacje i doświadczenie, dzięki czemu każda animacja
          jest na najwyższym poziomie. Jeśli chcesz, aby twoje wydarzenie było
          pełne uśmiechu i świetnej zabawy - jesteśmy do Twojej dyspozycji!
        </li>
      </ul> */}
      <h1 className="mt-12 text-2xl">
          Od lat tworzymy niezapomniane chwile dla dzieci, organizując animacje 
          zarówno w naszej sali zabaw, jak i poza nią. Obsługujemy komunie, 
          wesela, imprezy okolicznościowe oraz duże eventy, zapewniając 
          profesjonalną opiekę i świetną zabawę. <br/><br/>
          Nasza kadra to młode, pełne energii i doskonale przeszkolone 
          animatorki, które mają ogromne serce do pracy z dziećmi i głowy pełne 
          kreatywnych pomysłów. Co nas wyróżnia? Jako jedyni w okolicy oferujemy 
          gry wielkoformatowe oraz niezwykle bogaty program animacyjny. <br/><br/>
          Nasi animatorzy to nie przypadkowe osoby - wszyscy posiadają 
          odpowiednie kwalifikacje i doświadczenie, dzięki czemu każda animacja 
          jest na najwyższym poziomie. Jeśli chcesz, aby twoje wydarzenie było 
          pełne uśmiechu i świetnej zabawy - jesteśmy do Twojej dyspozycji! 
        
      </h1>

      <br></br>
      <hr></hr>
      <br></br>

      <div>
        <h1 className="text-5xl">Kontakt</h1>

        <br></br>

        <h2>Adres:</h2>
        <p>
          <b>Kadłubek 2, 32-500 Chrzanów</b>
          <br />
          <b>Pon - Pt :</b> 14:00 - 20:00
          <br />
          <b>Sobota i niedziela:</b> 08:00 - 16:00
        </p>
        <br></br>
        <h2>Kontakt:</h2>
        <p>
          <b>Tel:</b> +48 505 340 753
          <br />
          <b>E-mail:</b> tipitipi.kontakt@gmail.com
        </p>
        <hr></hr>
        {/* <iframe
          title="b"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2557.0223748554645!2d19.409808976539107!3d50.14201327153497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716eeb11871fa5d%3A0xe3333daf7f955250!2sCentrum%20Handlowe%20MAX!5e0!3m2!1spl!2spl!4v1697022456514!5m2!1spl!2spl"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[80vh]  py-5"
        ></iframe> */}
        <iframe
          title="b"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2557.033220786318!2d19.403160677055276!3d50.14181037153491!2m3!1f0!2
        f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4716eeb3acab8d21%3A0xd743d9d594805e86!2sKad%C5%82ubek%202%2C%2032-500%20Chrzan%C3%B3w!5e0!3m
        2!1spl!2spl!4v1738865741884!5m2!1spl!2spl"
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[80vh]  py-5"
        ></iframe>
      </div>
    </div>
  );
};
export default About;
