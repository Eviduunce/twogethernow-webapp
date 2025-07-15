# Wedding Guest Web App

A responsive web application that displays wedding information for guests who scan the QR code from the iOS app.

## Features

- **Wedding Information**: Displays couple names, date, time, venue, and additional details
- **Timeline**: Shows wedding day schedule and events
- **Photo Gallery**: Displays wedding photos with modal viewing
- **Interactive Quiz**: Allows guests to test their knowledge about the couple
- **Countdown Timer**: Real-time countdown to the wedding day
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop

## Design System

The web app matches the iOS app's design system:
- **Colors**: Uses the same wedding theme colors (weddingMenuActive, weddingBackground)
- **Typography**: Replicates SwiftUI font hierarchy (.largeTitle, .headline, .body, .caption)
- **Components**: Card layouts, buttons, and spacing match the iOS app
- **Icons**: Uses similar iconography and visual elements

## File Structure

```
wedding-guest-app/
├── index.html          # Main HTML structure
├── styles.css          # CSS with iOS design system replication
├── script.js           # JavaScript functionality
├── README.md           # This file
└── data/              # Wedding data JSON files (created by iOS app export)
    └── wedding-{ID}.json
```

## Setup for GitHub Pages

1. Create a new GitHub repository named `wedding-guest-app`
2. Upload all files to the repository
3. Enable GitHub Pages in repository settings
4. Set source to "Deploy from a branch" and select "main"
5. Your web app will be available at: `https://yourusername.github.io/wedding-guest-app`

## Data Integration

The web app expects wedding data in JSON format at `./data/wedding-{ID}.json`. The iOS app exports this data which should be uploaded to the `data/` folder.

### Sample Data Structure

```json
{
  "weddingID": "ABC12345",
  "weddingInfo": {
    "brideName": "Nelli",
    "groomName": "Timo",
    "weddingDate": "Saturday, July 19, 2025",
    "weddingStartTime": "2:00 PM",
    "venueName": "Terrassenhof",
    "venueAddress": "123 Wedding Lane...",
    "welcomeQuote": "Two hearts, one love...",
    "messageFromCouple": "We are so excited...",
    "dressCode": "Cocktail attire...",
    "giftInformation": "Your presence is...",
    "contactInfo": "For questions...",
    "parkingInfo": "Free parking..."
  },
  "timeline": [...],
  "quiz": {...},
  "photos": [...],
  "exportDate": "2025-07-14T..."
}
```

## QR Code Integration

The iOS app generates QR codes that link to:
```
https://yourusername.github.io/wedding-guest-app?id=ABC12345
```

The web app reads the `id` parameter and loads the corresponding wedding data.

## Customization

To customize the web app for your wedding:

1. **Colors**: Update CSS variables in `styles.css` `:root` section
2. **Fonts**: Change font family in CSS variables
3. **Content**: Modify sample data in `script.js` for testing
4. **Features**: Add or remove tabs by modifying HTML and JavaScript

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

For local development:
1. Start a local HTTP server: `python -m http.server 8000`
2. Open `http://localhost:8000`
3. Add `?id=TEST123` to test with sample data

## Deployment Checklist

- [ ] Upload all files to GitHub repository
- [ ] Enable GitHub Pages
- [ ] Test with sample wedding ID
- [ ] Update QR code generator in iOS app with correct URL
- [ ] Export and upload actual wedding data
- [ ] Test QR code scanning from mobile devices

## Performance

- Optimized for mobile-first loading
- CSS Grid for responsive layouts
- Minimal JavaScript for fast loading
- Image optimization for photo gallery