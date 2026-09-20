import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-dip-decision',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './dip-decision.component.html',
  styleUrls: ['./dip-decision.component.css']
})
export class DipDecisionComponent {
}