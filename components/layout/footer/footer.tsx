import { SanityFooter } from '@/components/cms/sanity-footer';
import { getSettings } from '@/sanity/lib/get-settings';

export async function Footer() {
  const settings = await getSettings();

  if (!settings) {
    // Fallback footer jeśli nie ma danych z Sanity
    return (
      <footer className='bg-secondary p-8 text-white'>
        <div className='mx-auto max-w-6xl text-center'>
          <p>© 2025 WB Cars. Wszystkie prawa zastrzeżone.</p>
        </div>
      </footer>
    );
  }

  return <SanityFooter {...settings} />;
}
