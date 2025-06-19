// data.js - Static data configuration
export const chartData = {
  '12 Months': {
    labels: ['Jun 24', 'May 24', 'Apr 24', 'Mar 24', 'Feb 24', 'Jan 24', 'Dec 23', 'Nov 23', 'Oct 23', 'Sep 23', 'Aug 23', 'Jul 23'],
    values: [9200, 8200, 7200, 6200, 5200, 4200, 3800, 3500, 3200, 3000, 2800, 2500],
    tooltips: [
      'June 2024: 9,200',
      'May 2024: 8,200',
      'April 2024: 7,200',
      'March 2024: 6,200',
      'February 2024: 5,200',
      'January 2024: 4,200',
      'December 2023: 3,800',
      'November 2023: 3,500',
      'October 2023: 3,200',
      'September 2023: 3,000',
      'August 2023: 2,800',
      'July 2023: 2,500'
    ],
    wavePattern: [0, 0.5, 1, 1.5, 1, 1.5, 2, 2.5, 3, 2.5, 3.5, 5]
  },
  '6 Months': {
    labels: ['Jun 24', 'May 24', 'Apr 24', 'Mar 24', 'Feb 24', 'Jan 24'],
    values: [9200, 8200, 7200, 6200, 5200, 4200],
    tooltips: [
      'June 2024: 9,200',
      'May 2024: 8,200',
      'April 2024: 7,200',
      'March 2024: 6,200',
      'February 2024: 5,200',
      'January 2024: 4,200'
    ],
    wavePattern: [0, 1, 2, 1.5, 2.5, 4]
  },
  '30 Days': {
    labels: [
      'May 1', 'May 2', 'May 3', 'May 4', 'May 5', 'May 6', 'May 7', 'May 8', 'May 9', 'May 10',
      'May 11', 'May 12', 'May 13', 'May 14', 'May 15', 'May 16', 'May 17', 'May 18', 'May 19', 'May 20',
      'May 21', 'May 22', 'May 23', 'May 24', 'May 25', 'May 26', 'May 27', 'May 28', 'May 29', 'May 30'
    ],
    values: [
      720, 735, 750, 730, 745, 760, 780, 770, 755, 740,
      730, 745, 760, 775, 790, 810, 800, 785, 770, 755,
      740, 760, 780, 800, 820, 805, 790, 775, 760, 750
    ],
    tooltips: [
      'Thu, May 1, 2025: 720',
      'Fri, May 2, 2025: 735',
      'Sat, May 3, 2025: 750',
      'Sun, May 4, 2025: 730',
      'Mon, May 5, 2025: 745',
      'Tue, May 6, 2025: 760',
      'Wed, May 7, 2025: 780',
      'Thu, May 8, 2025: 770',
      'Fri, May 9, 2025: 755',
      'Sat, May 10, 2025: 740',
      'Sun, May 11, 2025: 730',
      'Mon, May 12, 2025: 745',
      'Tue, May 13, 2025: 760',
      'Wed, May 14, 2025: 775',
      'Thu, May 15, 2025: 790',
      'Fri, May 16, 2025: 810',
      'Sat, May 17, 2025: 800',
      'Sun, May 18, 2025: 785',
      'Mon, May 19, 2025: 770',
      'Tue, May 20, 2025: 755',
      'Wed, May 21, 2025: 740',
      'Thu, May 22, 2025: 760',
      'Fri, May 23, 2025: 780',
      'Sat, May 24, 2025: 800',
      'Sun, May 25, 2025: 820',
      'Mon, May 26, 2025: 805',
      'Tue, May 27, 2025: 790',
      'Wed, May 28, 2025: 775',
      'Thu, May 29, 2025: 760',
      'Fri, May 30, 2025: 750'
    ],
    wavePattern: [
      0, 0.5, 1, 0.8, 1.2, 1.5, 2, 1.8, 1.5, 1.2,
      1, 1.2, 1.5, 1.8, 2, 2.2, 2, 1.8, 1.5, 1.2,
      1, 1.2, 1.5, 1.8, 2, 1.8, 1.5, 1.2, 1, 0.8
    ]
  },
  '7 Days': {
    labels: ['Mon 26', 'Tue 27', 'Wed 28', 'Thu 29', 'Fri 30', 'Sat 31', 'Sun 1'],
    values: [805, 790, 775, 760, 750, 740, 730],
    tooltips: [
      'Mon, May 26, 2025: 805',
      'Tue, May 27, 2025: 790',
      'Wed, May 28, 2025: 775',
      'Thu, May 29, 2025: 760',
      'Fri, May 30, 2025: 750',
      'Sat, May 31, 2025: 740',
      'Sun, Jun 1, 2025: 730'
    ],
    wavePattern: [0, 1, 2, 1, 1.5, 0.5, 3]
  }
};