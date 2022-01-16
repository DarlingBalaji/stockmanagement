import { Component, OnInit, ElementRef ,ViewChild} from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {
  title = 'html-to-pdf-angular-application';
  public convetToPDF(){
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
    // Few necessary setting options
    var imgWidth = 208;
    var pageHeight = 295;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;
    
    const contentDataURL = canvas.toDataURL('image/pdf')
    let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
    var position = 0;
    pdf.addImage(contentDataURL, 'PDF', 0, position, imgWidth, imgHeight)
    pdf.save('new-file.pdf'); // Generated PDF
    });
  }
  constructor() { }

  ngOnInit() {
  }



}
