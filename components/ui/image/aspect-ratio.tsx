type CustomAspectRatio = { type_: 'custom'; value: string };

export type AspectRatio = '3/4' | '9/16' | '6/18' | '1/1' | '4/3' | '13/5' | '2/3' | '3/2' | CustomAspectRatio;

export const aspectRatioToClassName = {
  '2/3': 'pb-2/3',
  '3/2': 'pb-3/2',
  '3/4': 'pb-3/4',
  '9/16': 'pb-9/16',
  '6/18': 'pb-6/18',
  '1/1': 'pb-1/1',
  '4/3': 'pb-4/3',
  '13/5': 'pb-13/5',
} satisfies {
  [K in Exclude<AspectRatio, CustomAspectRatio>]: unknown;
};

export const countAspectRatio = (aspectRatio: AspectRatio) => {
  if (typeof aspectRatio === 'string') {
    const spitedAspectRatio = aspectRatio.split(/[/]/);

    return parseInt(spitedAspectRatio[0]) / parseInt(spitedAspectRatio[1]);
  }

  const spitedAspectRatio = aspectRatio.value.split(/[/]/);

  return parseInt(spitedAspectRatio[0]) / parseInt(spitedAspectRatio[1]);
};
