import { PageType, sanityComponent } from './sanity-component';

interface BaseSanityComponentData {
  _key: string;
  _type: string;
}

type AwaitedReturnType<T extends PageType> = Awaited<ReturnType<(typeof sanityComponent)[T]>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ParametersOfReturnedType<T> = T extends (...args: infer P) => any ? P[0] : never;

type FunctionParameters<T extends PageType> = ParametersOfReturnedType<
  AwaitedReturnType<T>[keyof AwaitedReturnType<T>]
>;

interface SanityComponentsProps<T extends PageType> {
  pageType: T;
  sanityComponentsData: (BaseSanityComponentData & FunctionParameters<T>)[];
}

export const SanityComponents = async <T extends PageType>(props: SanityComponentsProps<T>) => {
  const { pageType, sanityComponentsData } = props;
  const pageComponents = await sanityComponent[pageType]();

  const firstImageSectionKey = sanityComponentsData.find((item) => item._type === 'imageSection')?._key;

  return sanityComponentsData.map((sanityComponentData) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const Component = pageComponents[sanityComponentData._type];
    if (!Component) return null;

    const isFirstImageSection = sanityComponentData._type === 'imageSection' && sanityComponentData._key === firstImageSectionKey;

    return <Component key={sanityComponentData._key} {...sanityComponentData} priority={isFirstImageSection} />;
  });
};
