import { HeroSection } from '@components/home/HeroSection';
import { ElementNavSection } from '@components/home/ElementNavSection';
import { FeaturedGridSection } from '@components/home/FeaturedGridSection';
import { TransparencySection } from '@components/home/TransparencySection';
import { PhilosophySection } from '@components/home/PhilosophySection';
import { ShowcaseSection } from '@components/home/ShowcaseSection';
import { MembershipTeaser } from '@components/home/MembershipTeaser';

/**
 * RITAFA Homepage.
 * Sections in order:
 *  01. Hero · From Lab to Life
 *  02. Element Navigation (4 atomic tiles)
 *  03. Featured Grid (editorial + masonry)
 *  04. Transparency Dashboard (Engineered in Vietnam)
 *  05. Philosophy (3 pillars)
 *  06. 3D Showcase (scrollytelling)
 *  07. Elementa Rewards (membership tease)
 */
export function HomePage() {
  return (
    <>
      <HeroSection />
      <ElementNavSection />
      <FeaturedGridSection />
      <TransparencySection />
      <PhilosophySection />
      <ShowcaseSection />
      <MembershipTeaser />
    </>
  );
}
