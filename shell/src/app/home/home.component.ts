import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-comp',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
 
  title = 'shell';

  ngOnInit(): void {
    console.log("yrdf");
    
  }
}
