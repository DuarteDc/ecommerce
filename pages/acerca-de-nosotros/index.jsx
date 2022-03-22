import Image from "next/image";
import React from "react";
import Layout from "../../src/components/Layouts";

export default function AboutPage() {
  return (
    <>
      <section className="text-center px-[15px] py-[92px] bg-about-us bg-cover  bg-centerbg-no-repeat">
        <h1 className="font-Poppins font-semibold text-5xl leading-[1.1] text-luz">Acerca de Nosotros</h1>
      </section>
      <section>
        <div className="max-w-[1220px] m-auto px-4">
          <div className="grid grid-rows-2 gap-10 my-20">
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-8">
                <div className="pr-[85px] pt-2">
                <div className="mb-[40px] text-center bg-[#f6f6f6] w-full p-[15px]">
                 <h3 className="font-semibold text-2xl leading-[1.2] color-[#333] pb-4">Nuestra Historia</h3>
                  </div>
                  <p className="font-Poppins text-sm leading-7 text-[#888] pb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris consequat consequat enim, non auctor massa ultrices
                    non. Morbi sed odio massa. Quisque at vehicula tellus, sed
                    tincidunt augue. Orci varius natoque penatibus et magnis dis
                    parturient montes, nascetur ridiculus mus. Maecenas varius
                    egestas diam, eu sodales metus scelerisque congue.
                  </p>
                   <p className="font-Poppins text-sm leading-7 text-[#888] pb-6"> Pellentesque habitant morbi tristique senectus et netus et
                    malesuada fames ac turpis egestas. Maecenas gravida justo eu
                    arcu egestas convallis. Nullam eu erat bibendum, tempus
                    ipsum eget, dictum enim. Donec non neque ut enim dapibus
                    tincidunt vitae nec augue. Suspendisse potenti. Proin ut est
                    diam. Donec condimentum euismod tortor, eget facilisis diam
                    faucibus et. Morbi a tempor elit. Donec gravida lorem elit,
                    quis condimentum ex semper sit amet. Fusce eget ligula
                    magna. Aliquam aliquam imperdiet sodales.</p>
                    <p className="font-Poppins text-sm leading-7 text-[#888] pb-6">Ut fringilla
                    turpis in vehicula vehicula. Pellentesque congue ac orci ut
                    gravida. Aliquam erat volutpat. Donec iaculis lectus a arcu
                    facilisis, eu sodales lectus sagittis. Etiam pellentesque,
                    magna vel dictum rutrum, neque justo eleifend elit, vel
                    tincidunt erat arcu ut sem. Sed rutrum, turpis ut commodo
                    efficitur, quam velit convallis ipsum, et maximus enim
                    ligula ac ligula. Any questions? Let us know in store at 8th
                    floor, 379 Hudson St, New York, NY 10018 or call us on (+1)
                    96 716 6879
                  </p>
                </div>
              </div>
              <div className="col-span-4">
                <div className="relative z-[1] before:bottom-[-21px] before:left-[-21px] before:block before:absolute before:z-[-1] before:w-full before:h-full before:border-solid before:border-[#ccc] before:border-[3px]">
                  <div className="block overflow-hidden">
                    <Image
                      src="/assets/images/item.jpg"
                      className="w-full h-full transition-all duration-[0.4s] ease-linear delay-0 hover:scale-[1.1] "
                      width={400}
                      height={500}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-10">
              <div className="col-span-4">
                <div className="relative z-[1] before:bottom-[-21px] before:left-[-21px] before:block before:absolute before:z-[-1] before:w-full before:h-full before:border-solid before:border-[#ccc] before:border-[3px]">
                  <div className="block overflow-hidden">
                    <Image
                      src="/assets/images/item.jpg"
                      className="w-full h-full transition-all duration-[0.4s] ease-linear delay-0 hover:scale-[1.1] "
                      width={400}
                      height={500}
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-8">
              <div className="pr-[85px] pt-2">
                 <div className="mb-[40px] text-center bg-[#f6f6f6] w-full p-[15px]">
                 <h3 className="font-semibold text-2xl leading-[1.2] color-[#333] pb-4">Nuestra Misión</h3>
                  </div>
                  <p className="font-Poppins text-sm leading-7 text-[#888] pb-6">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Mauris consequat consequat enim, non auctor massa ultrices
                    non. Morbi sed odio massa. Quisque at vehicula tellus, sed
                    tincidunt augue. Orci varius natoque penatibus et magnis dis
                    parturient montes, nascetur ridiculus mus. Maecenas varius
                    egestas diam, eu sodales metus scelerisque congue.
                  </p>
                   <p className="font-Poppins text-sm leading-7 text-[#888] pb-6"> Pellentesque habitant morbi tristique senectus et netus et
                    malesuada fames ac turpis egestas. Maecenas gravida justo eu
                    arcu egestas convallis. Nullam eu erat bibendum, tempus
                    ipsum eget, dictum enim. Donec non neque ut enim dapibus
                    tincidunt vitae nec augue. Suspendisse potenti. Proin ut est
                    diam. Donec condimentum euismod tortor, eget facilisis diam
                    faucibus et. Morbi a tempor elit. Donec gravida lorem elit,
                    quis condimentum ex semper sit amet. Fusce eget ligula
                    magna. Aliquam aliquam imperdiet sodales.</p>
                    <p className="font-Poppins text-sm leading-7 text-[#888] pb-6">Ut fringilla
                    turpis in vehicula vehicula. Pellentesque congue ac orci ut
                    gravida. Aliquam erat volutpat. Donec iaculis lectus a arcu
                    facilisis, eu sodales lectus sagittis. Etiam pellentesque,
                    magna vel dictum rutrum, neque justo eleifend elit, vel
                    tincidunt erat arcu ut sem. Sed rutrum, turpis ut commodo
                    efficitur, quam velit convallis ipsum, et maximus enim
                    ligula ac ligula. Any questions? Let us know in store at 8th
                    floor, 379 Hudson St, New York, NY 10018 or call us on (+1)
                    96 716 6879
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

AboutPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
