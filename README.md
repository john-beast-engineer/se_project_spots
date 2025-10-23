# Project: Spots

## Description

Spots is a responsive photo-sharing web application where users can create profiles, share photos, and interact with content. Built as part of the TripleTen Software Engineering bootcamp, this project demonstrates modern web development practices with a focus on user experience and form validation.

## Features

- **User Profiles** - Create and edit profile information with name and bio
- **Photo Sharing** - Add new photo posts with captions and image links
- **Interactive Gallery** - Like and delete photo cards
- **Full-Screen Preview** - Click any photo to view in full-screen modal
- **Real-Time Form Validation** - Instant feedback as users type
  - Invalid inputs show error messages and red borders
  - Submit buttons disable until all fields are valid
  - Browser-native validation with custom error display
- **Enhanced Modal UX** - Close modals with Escape key, overlay click, or X button
- **Smart Form Behavior** - Forms preserve data if closed without submitting, reset after successful submission
- **Responsive Design** - Adapts to desktop (1440px), tablet, and mobile (320px) viewports

## Technologies & Techniques

### **Frontend**

- **HTML5** - Semantic markup with validation attributes
- **CSS3** - Modern styling with BEM methodology
- **Vanilla JavaScript** - No frameworks, just fundamentals

### **JavaScript Features**

- **ValidityState API** - Browser-native form validation
- **Event Listeners** - Real-time validation, modal management
- **DOM Manipulation** - Dynamic content creation and updates
- **Configuration Objects** - Scalable, maintainable code architecture

### **Layout & Design**

- **CSS Grid** - Responsive card layout
- **Flexbox** - Component alignment
- **BEM Methodology** - Organized CSS architecture
- **Flat BEM File Structure** - Modular CSS organization
- **Media Queries** - Responsive breakpoints at 1100px and 630px

### **Form Validation**

- HTML5 attributes: `required`, `minlength`, `maxlength`, `type="url"`
- JavaScript validation using `validity.valid` and `validationMessage`
- Dynamic button state management
- Error message positioning with CSS

## Deployment

**Live Site:** https://john-beast-engineer.github.io/se_project_spots/

**Design:** [Figma Project](https://www.figma.com/file/BBNm2bC3lj8QQMHlnqRsga/Sprint-3-Project-%E2%80%94-Spots?type=design&node-id=2%3A60&mode=design&t=afgNFybdorZO6cQo-1)

## Project Videos

**Sprint 3 Overview:** https://youtu.be/hn-wtRtVQGU

**Sprint 6 Project Pitch:** Check out [this video](https://www.loom.com/share/8eade87e1ffd4cd8a94e175bc87dc9c8?sid=97904749-869a-48a2-a606-f31c828df450), where I describe the form validation features and challenges I faced while building them.

## Project Structure

```
se_project_spots/
├── blocks/          # BEM CSS blocks
├── images/          # Project images
├── pages/           # Page-level styles
├── scripts/
│   ├── index.js     # Main application logic
│   └── validation.js # Form validation logic
├── vendor/          # Third-party styles (fonts, normalize)
├── index.html       # Main HTML file
└── README.md
```

## Key Learnings

- Implementing real-time form validation with the ValidityState API
- Managing event listener lifecycle for performance
- Using configuration objects for scalable code
- CSS positioning contexts for proper error message display
- Balancing user guidance with form flexibility
- Debugging and problem-solving complex interactions
