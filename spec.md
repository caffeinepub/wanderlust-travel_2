# Wanderlust Travel

## Current State
A fully built Tour & Travel website with:
- Hero, Destinations, Packages, Why Choose Us, Testimonials, Newsletter, and Footer sections
- Backend: `submitInquiry`, `getAllInquiries`, `subscribe`, `getSubscriberCount`, `searchDestination`
- BookingModal for submitting inquiries stored on-chain
- No admin view to see submitted inquiries

## Requested Changes (Diff)

### Add
- Admin Dashboard page accessible via `/admin` route
- Table/list view of all submitted booking inquiries (name, email, package, travel date, number of travelers, message)
- Subscriber count display
- Simple tab or toggle navigation between the public site and admin dashboard

### Modify
- App.tsx: add routing support (hash-based or state-based) to toggle between public site and admin dashboard view

### Remove
- Nothing removed

## Implementation Plan
1. Add an `AdminDashboard` component that calls `getAllInquiries()` and `getSubscriberCount()` and displays results in a clean table
2. Add routing/view toggle in App.tsx (hash-based: `#admin`) to show either the main site or the admin dashboard
3. Add a subtle "Admin" link in the Navbar or Footer that navigates to `#admin`
4. Display inquiry list with columns: Name, Email, Package, Travel Date, Travelers, Message
5. Display total inquiries count and subscriber count as stat cards at the top
6. Empty state when no inquiries exist
7. Add deterministic `data-ocid` markers to all interactive elements
