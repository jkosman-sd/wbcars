type CustomAspectRatio = { type_: 'custom'; value: string };

export type AspectRatio = '3/4' | '9/16' | '16/9' | '6/18' | '1/1' | '4/3' | '13/5' | '2/3' | '3/2' | CustomAspectRatio;

export const aspectRatioToClassName: Record<string, string> = {
  '9/16': 'aspect-[9/16]',
  '3/4': 'aspect-[3/4]',
  '16/9': 'aspect-video',
  '1/1': 'aspect-square',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '13/5': 'aspect-[13/5]',
};

export const countAspectRatio = (aspectRatio: AspectRatio) => {
  if (typeof aspectRatio === 'string') {
    const spitedAspectRatio = aspectRatio.split(/[/]/);

    return parseInt(spitedAspectRatio[0]) / parseInt(spitedAspectRatio[1]);
  }

  const spitedAspectRatio = aspectRatio.value.split(/[/]/);

  return parseInt(spitedAspectRatio[0]) / parseInt(spitedAspectRatio[1]);
};
