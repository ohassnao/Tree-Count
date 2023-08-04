import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit() {
    // Navbar shrink function
    const navbarShrink = () => {
      const navbarCollapsible = document.body.querySelector('#mainNav') as HTMLElement;
      if (window.scrollY === 0) {
        navbarCollapsible.classList.remove('navbar-shrink');
      } else {
        navbarCollapsible.classList.add('navbar-shrink');
      }
    };
    

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
      new bootstrap.ScrollSpy(document.body, {
        target: '#mainNav',
        rootMargin: '0px 0px -40%'
      });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler') as HTMLElement;
    const responsiveNavItems = Array.from(document.querySelectorAll('#navbarResponsive .nav-link'));
    responsiveNavItems.map((responsiveNavItem: any) => {
      responsiveNavItem.addEventListener('click', () => {
        if (window.getComputedStyle(navbarToggler).display !== 'none') {
          navbarToggler.click();
        }
      });
    });
  }
}
