"use client";

import { sliderProps } from "@/utility/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";

const TestimonialSlider = ({ sectionBg = true }) => {
  return (
    <section
      className={`testimonial-section fix section-padding ${
        sectionBg ? "section-bg" : ""
      }`}
    >
      <div className="burger-shape">
        <img src="/assets/img/shape/burger-shape-3.png" alt="burger-shape" />
      </div>
      <div className="fry-shape">
        <img src="/assets/img/shape/fry-shape-2.png" alt="burger-shape" />
      </div>
      <div className="pizza-shape">
        <img src="/assets/img/shape/pizzashape.png" alt="burger-shape" />
      </div>
      <div className="container">
        <div className="testimonial-wrapper style-responsive">
          <div className="testimonial-items text-center">
            <Swiper
              {...sliderProps.testimonialContentSlider}
              className="swiper testimonial-content-slider"
            >
              <SwiperSlide className="swiper-slide">
                <div className="testimonial-content">
                  <div className="client-info">
                    <h4>Piter Bowman</h4>
                    <h5>Business CEO &amp; co founder</h5>
                  </div>
                  <h3>
                    “Thank you for dinner last night. It was amazing!! I have
                    say it’s the best meal I have had in quite some time. will
                    definitely be seeing more eating next year.”
                  </h3>
                  <div className="star">
                    <span className="fas fa-star" />
                    <span className="fas fa-star" />
                    <span className="fas fa-star" />
                    <span className="fas fa-star" />
                    <span className="fas fa-star" />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="testimonial-content">
                  <div className="client-info">
                    <h4>Sarah Jenkins</h4>
                    <h5>Food Critic &amp; Blogger</h5>
                  </div>
                  <h3>
                    “The culinary experience here is beyond exceptional! From
                    the crisp crust to the flavorful sauces, everything tasted
                    absolutely divine.”
                  </h3>
                  <div className="star">
                    <span className="fas fa-star" />
                    <span className="fas fa-star" />
                    <span className="fas fa-star" />
                    <span className="fas fa-star" />
                    <span className="fas fa-star" />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="testimonial-content">
                  <div className="client-info">
                    <h4>David Miller</h4>
                    <h5>Executive Chef</h5>
                  </div>
                  <h3>
                    “Spectacular attention to ingredient quality and freshness.
                    Hands down one of the top gourmet burger and pizza spots in
                    town.”
                  </h3>
                  <div className="star">
                    <span className="fas fa-star" />
                    <span className="fas fa-star" />
                    <span className="fas fa-star" />
                    <span className="fas fa-star" />
                    <span className="fas fa-star" />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="testimonial-content">
                  <div className="client-info">
                    <h4>Emily Watson</h4>
                    <h5>Creative Director</h5>
                  </div>
                  <h3>
                    “Fast delivery, steaming hot food, and unforgettable
                    authentic flavors every single time we order. Highly
                    recommended!”
                  </h3>
                  <div className="star">
                    <span className="fas fa-star" />
                    <span className="fas fa-star" />
                    <span className="fas fa-star" />
                    <span className="fas fa-star" />
                    <span className="fas fa-star" />
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
            <Swiper
              {...sliderProps.testimonialImageSlider}
              className="swiper testimonial-image-slider"
            >
              <SwiperSlide className="swiper-slide">
                <div className="client-image-item">
                  <div
                    className="client-img bg-cover"
                    style={{
                      backgroundImage:
                        'url("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80")',
                    }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="client-image-item">
                  <div
                    className="client-img bg-cover"
                    style={{
                      backgroundImage:
                        'url("https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80")',
                    }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="client-image-item">
                  <div
                    className="client-img bg-cover"
                    style={{
                      backgroundImage:
                        'url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80")',
                    }}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="client-image-item">
                  <div
                    className="client-img bg-cover"
                    style={{
                      backgroundImage:
                        'url("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80")',
                    }}
                  />
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};
export default TestimonialSlider;

export const TestimonialSlider2 = () => {
  return (
    <section className="testimonial-section-2">
      <div className="container">
        <div
          className="testimonial-wrapper-2 bg-cover"
          style={{ backgroundImage: 'url("/assets/img/client/bg-shape.png")' }}
        >
          <div className="row align-items-center">
            <div className="col-xl-4 col-lg-4">
              <div
                className="testimonial-image bg-cover"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80")',
                }}
              >
                <div className="feedback d-flex align-items-center">
                  <img src="/assets/img/feedback.svg" alt="img" />
                  <h4>Feedback</h4>
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-lg-8 mt-5 mt-lg-0">
              <Swiper
                {...sliderProps.testimonialContentSlider2}
                className="swiper testimonial-content-slider-2"
              >
                <SwiperSlide className="swiper-slide">
                  <div className="testimonial-content center">
                    <div className="client-info">
                      <h4>Piter Bowman</h4>
                      <h5>Business CEO &amp; co founder</h5>
                    </div>
                    <h3>
                      “Thank you for dinner last night. It was amazing!! I have
                      say it’s the best meal I have had in quite some time. will
                      definitely be seeing more eating next year.”
                    </h3>
                    <div className="star">
                      <span className="fas fa-star" />
                      <span className="fas fa-star" />
                      <span className="fas fa-star" />
                      <span className="fas fa-star" />
                      <span className="fas fa-star" />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="testimonial-content center">
                    <div className="client-info">
                      <h4>Sophia Rodriguez</h4>
                      <h5>Food Enthusiast</h5>
                    </div>
                    <h3>
                      “An explosion of authentic flavors and unmatched
                      hospitality. The burger and pizza crust was perfected to
                      sheer excellence.”
                    </h3>
                    <div className="star">
                      <span className="fas fa-star" />
                      <span className="fas fa-star" />
                      <span className="fas fa-star" />
                      <span className="fas fa-star" />
                      <span className="fas fa-star" />
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
              <div className="swiper-dot style-2">
                <div className="dot-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TestimonialSlider3 = () => {
  return (
    <section className="testimonial-section fix section-padding">
      <div className="container">
        <div className="testimonial-wrapper-4">
          <div className="row align-items-center justify-content-between">
            <div className="col-xl-7 col-lg-7">
              <Swiper
                {...sliderProps.testimonialContentSlider3}
                className="swiper testimonial-content-slider-3"
              >
                <SwiperSlide className="swiper-slide">
                  <div className="testimonial-content">
                    <div className="info-icon d-flex align-items-center">
                      <img src="/assets/img/icon/quote.svg" alt="icon-img" />
                      <h4>Quality Food</h4>
                      <div className="star">
                        <span className="fas fa-star" />
                        <span className="fas fa-star" />
                        <span className="fas fa-star" />
                        <span className="fas fa-star" />
                        <span className="fas fa-star" />
                      </div>
                    </div>
                    <h3>
                      Nestled within a fresh, toasted bun, each bite unveils a
                      perfect harmony of textures, complemented by layers of
                      crisp lettuce, ripe tomatoes, and the crunch pickles Our
                      secret sauce proprietary blend savory
                    </h3>
                    <div className="client-info d-flex align-items-center">
                      <div
                        className="client-image bg-cover"
                        style={{
                          backgroundImage:
                            'url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80")',
                        }}
                      />
                      <div className="title">
                        <h4>
                          Richard D. Baker/ <span>CEO &amp; Founder</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="testimonial-content">
                    <div className="info-icon d-flex align-items-center">
                      <img src="/assets/img/icon/quote.svg" alt="icon-img" />
                      <h4>Quality Food</h4>
                      <div className="star">
                        <span className="fas fa-star" />
                        <span className="fas fa-star" />
                        <span className="fas fa-star" />
                        <span className="fas fa-star" />
                        <span className="fas fa-star" />
                      </div>
                    </div>
                    <h3>
                      Nestled within a fresh, toasted bun, each bite unveils a
                      perfect harmony of textures, complemented by layers of
                      crisp lettuce, ripe tomatoes, and the crunch pickles Our
                      secret sauce proprietary blend savory
                    </h3>
                    <div className="client-info d-flex align-items-center">
                      <div
                        className="client-image bg-cover"
                        style={{
                          backgroundImage:
                            'url("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80")',
                        }}
                      />
                      <div className="title">
                        <h4>
                          Richard D. Baker/ <span>CEO &amp; Founder</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="col-xl-4 col-lg-4 mt-5 mt-lg-0">
              <div
                className="testimonial-image bg-cover"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80")',
                }}
              />
            </div>
          </div>
          <div className="swiper-dot-2">
            <div className="dot-2" />
          </div>
        </div>
      </div>
    </section>
  );
};
