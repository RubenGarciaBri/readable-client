import React, {useState} from 'react'
import Nav from '../components/NavBar'
import { FaFileAlt, FaComments, FaUsers, FaPlus } from "react-icons/fa";

const HelpPage = () => {
  const [isFaqOpen, setIsFaqOpen] = useState(false)

  const onFaqToggle = () => {
    setIsFaqOpen(!isFaqOpen)
  }

  return (
    <div className="helpPage">
      <Nav />
      <div className="dashboard dashboard--knowledge">
        <div className="support-container">
          <div className="support-hero main-container">
            <h1 className="support-hero__heading">The Knowledge Hub</h1>
            <p className="support-hero__subheading">Check our articles and documentation to help you get up and running.</p>
          </div>
          <div className="support-cards">
            <div className="cardSupport cardSupport--1 shadow-slim">
              <FaFileAlt className="fas fa-file-alt cardSupport__icon cardSupport__icon--1"/>
              <h4 className="cardSupport__heading">Articles</h4>
              <p className="cardSupport__text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <a href="" className="cardSupport__link cardSupport__link--1 ">Read more</a>
            </div>
            <div className="cardSupport cardSupport--2 shadow-deep-s shadow-slim">
              <FaComments className="far fa-comments cardSupport__icon cardSupport__icon--2"/>
              <h4 className="cardSupport__heading">Popular Questions</h4>
              <p className="cardSupport__text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <a href="" className="cardSupport__link cardSupport__link--2">Read more</a>
            </div>
            <div className="cardSupport cardSupport--3 shadow-deep-s shadow-slim">
              <FaUsers className="fas fa-users cardSupport__icon cardSupport__icon--3"/>
              <h4 className="cardSupport__heading">Community</h4>
              <p className="cardSupport__text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <a href="" className="cardSupport__link cardSupport__link--3">Read more</a>
            </div>
          </div>
          <div className="support-faq main-container">
            <h2 className="support-faq__heading">Frequently Asked Questions</h2>
            <div className="faqAccordion">
              <div className="faqAccordion-tab">
                <button type="button" className="faqAccordion__btn">Can I try the app before buying one of the plans?
                <FaPlus className="faqAccordion__btn-icon fas fa-plus"/>
                </button>
                <div className="faqAccordion__content">
                  <p className="faqAccordion__content-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat eum
                    adipisci enim unde, pariatur animi delectus, doloribus sed dicta dolor minus alias reprehenderit dolores
                    rerum eveniet. Hic enim ipsa facere aperiam consequatur quae deleniti commodi qui quia asperiores at
                    necessitatibus corporis cupiditate temporibus quod, quidem, non corrupti totam blanditiis minus!</p>
                </div>
              </div>
              <div className="faqAccordion-tab">
                <button type="button" className="faqAccordion__btn">How do I create a support ticket?
                <FaPlus className="faqAccordion__btn-icon fas fa-plus"/>
                </button>
                <div className="faqAccordion__content">
                  <p className="faqAccordion__content-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                    eum
                    adipisci enim unde, pariatur animi delectus, doloribus sed dicta dolor minus alias reprehenderit
                    dolores
                    rerum eveniet. Hic enim ipsa facere aperiam consequatur quae deleniti commodi qui quia asperiores at
                    necessitatibus corporis cupiditate temporibus quod, quidem, non corrupti totam blanditiis minus!</p>
                </div>
              </div>
              <div className="faqAccordion-tab">
                <button type="button" className="faqAccordion__btn">How do I change my existing password?
                <FaPlus className="faqAccordion__btn-icon fas fa-plus"/>
                </button>
                <div className="faqAccordion__content">
                  <p className="faqAccordion__content-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                    eum
                    adipisci enim unde, pariatur animi delectus, doloribus sed dicta dolor minus alias reprehenderit
                    dolores
                    rerum eveniet. Hic enim ipsa facere aperiam consequatur quae deleniti commodi qui quia asperiores at
                    necessitatibus corporis cupiditate temporibus quod, quidem, non corrupti totam blanditiis minus!</p>
                </div>
              </div>
              <div className="faqAccordion-tab">
                <button type="button" className="faqAccordion__btn">Why haven't I received my confirmation email?
                <FaPlus className="faqAccordion__btn-icon fas fa-plus"/>
                </button>
                <div className="faqAccordion__content">
                  <p className="faqAccordion__content-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                    eum
                    adipisci enim unde, pariatur animi delectus, doloribus sed dicta dolor minus alias reprehenderit
                    dolores
                    rerum eveniet. Hic enim ipsa facere aperiam consequatur quae deleniti commodi qui quia asperiores at
                    necessitatibus corporis cupiditate temporibus quod, quidem, non corrupti totam blanditiis minus!</p>
                </div>
              </div>
              <div className="faqAccordion-tab">
                <button type="button" className="faqAccordion__btn">How do I upload custom email lists to my account?
                <FaPlus className="faqAccordion__btn-icon fas fa-plus"/>
                </button>
                <div className="faqAccordion__content">
                  <p className="faqAccordion__content-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat eum
                    adipisci enim unde, pariatur animi delectus, doloribus sed dicta dolor minus alias reprehenderit dolores
                    rerum eveniet. Hic enim ipsa facere aperiam consequatur quae deleniti commodi qui quia asperiores at
                    necessitatibus corporis cupiditate temporibus quod, quidem, non corrupti totam blanditiis minus!</p>
                </div>
              </div>
              <div className="faqAccordion-tab">
                <button type="button" className="faqAccordion__btn">How do I change my current subscription plan?
                <FaPlus className="faqAccordion__btn-icon fas fa-plus"/>
                </button>
                <div className="faqAccordion__content">
                  <p className="faqAccordion__content-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                    eum
                    adipisci enim unde, pariatur animi delectus, doloribus sed dicta dolor minus alias reprehenderit
                    dolores
                    rerum eveniet. Hic enim ipsa facere aperiam consequatur quae deleniti commodi qui quia asperiores at
                    necessitatibus corporis cupiditate temporibus quod, quidem, non corrupti totam blanditiis minus!</p>
                </div>
              </div>
              
            </div>
          </div>
          <footer className="footer">
            <h5 className="footer__heading footer__heading-1">© 2020 My Fictional App - All rights reserved</h5>
            <h5 className="footer__heading footer__heading-2">Made with <i className="footer__icon fas fa-heart"></i> by Ruben
              Garcia</h5>
          </footer>
        </div>
        
      </div>
    </div>
  )
}

export default HelpPage
