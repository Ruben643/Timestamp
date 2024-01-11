import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface Entry {
  userId: string;
  recordedDateTime: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userId: string = '';
  recordedDateTime: string = '';
  postSuccessMessage: string = '';
  postErrorMessage: string = '';
  entries: Entry[] = [];

  constructor(private http: HttpClient) {}

  sendDateTime() {
    const currentDate = new Date();
    this.recordedDateTime = currentDate.toISOString();

    const newEntry: Entry = {
      userId: this.userId,
      recordedDateTime: this.recordedDateTime,
    };

    // Add the new entry to the list
    this.entries.push(newEntry);

    // Send data to the server using a POST request
    this.http.post('server name goes here', newEntry)
      .subscribe(
        response => {
          console.log('Server response:', response);
          // Handle the server response as needed
          this.postSuccessMessage = 'Date and Time successfully posted!';
          this.postErrorMessage = ''; // Reset error message
        },
        error => {
          console.error('Error posting data:', error);
          this.postSuccessMessage = '';
          this.postErrorMessage = 'Error posting data. Please try again.';
        }
      );
  }

  clearList() {
    this.entries = [];
    this.postSuccessMessage = '';
    this.postErrorMessage = '';
  }
}