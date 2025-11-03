export const HeroMask = () => {
  return (
    <svg
      width='1066'
      height='723'
      viewBox='0 0 1066 723'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      style={{ position: 'absolute', width: 0, height: 0 }}
    >
      <defs>
        <mask id='hero-diagonal-mask' maskUnits='objectBoundingBox' maskContentUnits='objectBoundingBox'>
          <rect width='1' height='1' fill='white' />
          <path d='M0.094 0L0 0.138V0H0.094Z' fill='black' transform='scale(1, 1)' />
          <path d='M0.281 0L0 0.415V0.277L0.188 0H0.281Z' fill='black' />
          <path d='M0.469 0L0 0.692V0.553L0.375 0H0.469Z' fill='black' />
          <path d='M0.657 0L0 0.968V0.830L0.563 0H0.657Z' fill='black' />
          <path d='M0.844 0L0 1V1L0.678 0H0.844Z' fill='black' />
          <path d='M1 0.091L0.188 1H0L0.812 0L1 0.091Z' fill='black' />
          <path d='M1 0.368L0.375 1H0.188L1 0.216V0.368Z' fill='black' />
          <path d='M1 0.644L0.563 1H0.375L1 0.492V0.644Z' fill='black' />
          <path d='M1 0.921L0.750 1H0.563L1 0.769V0.921Z' fill='black' />
          <path d='M1 1L0.938 1H0.750L1 0.907V1Z' fill='black' />
        </mask>
      </defs>
    </svg>
  );
};
