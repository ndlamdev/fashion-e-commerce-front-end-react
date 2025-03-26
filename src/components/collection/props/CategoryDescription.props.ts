export type CategoryDescriptionProps = {
  title: string;
  description: string;
  illustrationUrl?: string;
  subDescription?: CategoryDescriptionProps[] | undefined;
}