import { getSettings } from '@/sanity/lib/get-settings';
import { getSiteUrl } from '@/sanity/lib/get-site-url';

export const revalidate = 3600;

export async function GET() {
  const settings = await getSettings();
  const siteUrl = getSiteUrl(settings?.url) || 'https://www.wbcars.pl';

  const phone = settings?.phone || '+48 577 211 777';
  const email = settings?.mail || 'wbcarss@gmail.com';
  const address = settings?.address || 'Tarnów';

  const body = `# WB Cars

> Studio detailingu samochodowego w Tarnowie: folie ochronne PPF, powłoki ceramiczne, korekta lakieru, detailing wnętrza.

WB Cars to autoryzowane studio detailingu samochodowego działające w Tarnowie, autoryzowany partner Gtechniq, z ponad 3000 zrealizowanych projektów.

## Kontakt

- Telefon: ${phone}
- E-mail: ${email}
- Adres: ${address}
- Strona: ${siteUrl}

## Usługi

- Folie ochronne PPF (bezbarwne folie ochronne lakieru)
- Powłoki ceramiczne (długoterminowe zabezpieczenie lakieru)
- Korekta lakieru (usuwanie rys i hologramów)
- Detailing wnętrza

## Cennik

Aktualne pakiety i ceny usług dostępne są na stronie głównej: ${siteUrl}

## FAQ

Najczęściej zadawane pytania o PPF, powłoki ceramiczne i pielęgnację lakieru znajdują się na stronie głównej: ${siteUrl}

## Polityka prywatności

${siteUrl}/polityka-prywatnosci
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
