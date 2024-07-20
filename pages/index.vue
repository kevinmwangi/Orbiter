
<template>
    <div :class="$style.orbitsContainer" ref="container">
        <Orbit :orbit-data="sortedOrbits"/>
<!--        <CanvasOrbit :orbit-data="sortedOrbits" @avatar-click="handleAvatarClick"/>-->
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CanvasOrbit from '../components/CanvasOrbit.vue'
import Orbit from '../components/Orbit.vue'
import type { SingleOrbit, Avatar } from '~/types';
    definePageMeta({
        colorMode: 'dark',
        pageType: 'Home'
    })

    const orbits = ref<SingleOrbit[]>(
		[
			{
				"array": [
					{
						"id": 53,
						"created_at": 1704451485646,
						"name": "Carlie Cameron",
						"img": "https://i.pravatar.cc/150?img=42",
						"position": "Brand Manager",
						"city": "Copenhagen, Denmark",
						"_orbits_last_message": {
							"message": "Our Volunteer Appreciation Event on April 30th celebrates your dedication and hard work. Join us for an evening of gratitude, entertainment, and dinner. Your presence matters.",
							"message_head": "Volunteer Appreciation Event"
						}
					},
					{
						"id": 46,
						"created_at": 1704451485614,
						"name": "Ruben Pollard",
						"img": "https://i.pravatar.cc/150?img=35",
						"position": "Hospital Administrator",
						"city": "Warsaw, Poland",
						"_orbits_last_message": {
							"message": "We require immediate IT support for a system outage affecting multiple departments. Please prioritize this request to minimize disruptions. Your prompt assistance is crucial.",
							"message_head": "Urgent IT Support Request"
						}
					},
					{
						"id": 20,
						"created_at": 1704451485582,
						"name": "Nolan Atkinson",
						"img": "https://i.pravatar.cc/150?img=9",
						"position": "Data Scientist",
						"city": "Toronto, Canada",
						"_orbits_last_message": {
							"message": "You are scheduled for a performance review meeting on April 22nd. It’s an opportunity to discuss achievements, challenges, and career goals. Please prepare to review your annual objectives.",
							"message_head": "Performance Review Meeting"
						}
					},
					{
						"id": 58,
						"created_at": 1704451485652,
						"name": "Amy Boone",
						"img": "https://i.pravatar.cc/150?img=47",
						"position": "User Interface Designer",
						"city": "Lima, Peru",
						"_orbits_last_message": {
							"message": "Our fundraising campaign has raised over $50,000 so far, thanks to your generous contributions. These funds will support our community education project. Let's keep the momentum going!",
							"message_head": "Fundraising Campaign Update"
						}
					},
					{
						"id": 29,
						"created_at": 1704451485593,
						"name": "Reynaldo Brandt",
						"img": "https://i.pravatar.cc/150?img=18",
						"position": "Healthcare Administrator",
						"city": "Stockholm, Sweden",
						"_orbits_last_message": {
							"message": "Important notice: We're recalling Product X due to a potential safety issue. If you've purchased this item, please stop using it and follow the return instructions attached.",
							"message_head": "Product Recall Notice"
						}
					},
					{
						"id": 33,
						"created_at": 1704451485598,
						"name": "Geovanni Krueger",
						"img": "https://i.pravatar.cc/150?img=22",
						"position": "Customer Service Manager",
						"city": "Amsterdam, Netherlands",
						"_orbits_last_message": {
							"message": "Our latest marketing campaign has shown promising results, with a 25% increase in engagement. Let's discuss optimizations in our next meeting. Your inputs are valuable!",
							"message_head": "Marketing Campaign Update"
						}
					},
					{
						"id": 59,
						"created_at": 1704451485653,
						"name": "Nathalia Gibbs",
						"img": "https://i.pravatar.cc/150?img=48",
						"position": "Chemical Engineer",
						"city": "Warsaw, Poland",
						"_orbits_last_message": {
							"message": "We appreciate your interest in joining our team. Your job application is currently under review, and we expect to update you on the status by April 20th.",
							"message_head": "Job Application Status"
						}
					},
					{
						"id": 38,
						"created_at": 1704451485606,
						"name": "Joslyn Bauer",
						"img": "https://i.pravatar.cc/150?img=27",
						"position": "Investment Banker",
						"city": "Madrid, Spain",
						"_orbits_last_message": {
							"message": "An important update to our company policy will be implemented on May 1st. It is essential that all employees familiarize themselves with these changes. Details attached.",
							"message_head": "Important Policy Update"
						}
					}
				],
				"contact_date": "2024-07-19"
			},
			{
				"array": [
					{
						"id": 15,
						"created_at": 1704451485576,
						"name": "Kaleb Farrell",
						"img": "https://i.pravatar.cc/150?img=4",
						"position": "Registered Nurse (RN)",
						"city": "Paris, France",
						"_orbits_last_message": {
							"message": "Join our volunteer program to make a difference! Opportunities include event management and community outreach. It’s a chance to develop skills and give back. Apply by April 30th.",
							"message_head": "Volunteer Opportunity"
						}
					},
					{
						"id": 3,
						"created_at": 1704446491988,
						"name": "Jasper Malone",
						"img": "https://m.media-amazon.com/images/M/MV5BMmMzYjhlMTgtMjJlNC00Mzg2LWExM2UtNzcyN2Y2MmQxNjFiXkEyXkFqcGdeQXVyMDk0NDIwNQ@@._V1_FMjpg_UX1000_.jpg",
						"position": "Sales Representative",
						"city": "Norhaven, Sweden",
						"_orbits_last_message": {
							"message": "We are pleased to confirm your job interview for the marketing position on April 15th. This is an opportunity to showcase your skills and experience. Looking forward to meeting you.",
							"message_head": "Job Interview Confirmation"
						}
					},
					{
						"id": 12,
						"created_at": 1704451485572,
						"name": "Ethen Hernandez",
						"img": "https://i.pravatar.cc/150?img=1",
						"position": "Chief Executive Officer (CEO)",
						"city": "New York City, USA",
						"_orbits_last_message": {
							"message": "We are delighted to extend a job offer for the position of Marketing Manager. The package includes a competitive salary and benefits. Please review the attached terms and respond by April 25th.",
							"message_head": "Job Offer"
						}
					},
					{
						"id": 21,
						"created_at": 1704451485584,
						"name": "Kian Oliver",
						"img": "https://i.pravatar.cc/150?img=10",
						"position": "Sales Representative",
						"city": "Beijing, China",
						"_orbits_last_message": {
							"message": "We invite proposals for our upcoming renewable energy project. Include methodology, budget, and timelines. Submission deadline: April 30th. Looking forward to innovative solutions.",
							"message_head": "Request for Proposal"
						}
					},
					{
						"id": 41,
						"created_at": 1704451485609,
						"name": "Giada Christian",
						"img": "https://i.pravatar.cc/150?img=30",
						"position": "Warehouse Manager",
						"city": "Prague, Czech Republic",
						"_orbits_last_message": {
							"message": "Your product comes with a one-year warranty. It covers manufacturing defects and provides free servicing. For more information, please refer to the attached warranty document.",
							"message_head": "Product Warranty Information"
						}
					},
					{
						"id": 54,
						"created_at": 1704451485648,
						"name": "Sierra Bradley",
						"img": "https://i.pravatar.cc/150?img=43",
						"position": "Aerospace Engineer",
						"city": "Bogota, Colombia",
						"_orbits_last_message": {
							"message": "Please review the attached financial statement for Q1. Your insights on our expenditure and revenue trends are vital for our upcoming strategy meeting.",
							"message_head": "Financial Statement Review"
						}
					},
					{
						"id": 21,
						"created_at": 1704451485584,
						"name": "Kian Oliver",
						"img": "https://i.pravatar.cc/150?img=10",
						"position": "Sales Representative",
						"city": "Beijing, China",
						"_orbits_last_message": {
							"message": "We invite proposals for our upcoming renewable energy project. Include methodology, budget, and timelines. Submission deadline: April 30th. Looking forward to innovative solutions.",
							"message_head": "Request for Proposal"
						}
					},
					{
						"id": 41,
						"created_at": 1704451485609,
						"name": "Giada Christian",
						"img": "https://i.pravatar.cc/150?img=30",
						"position": "Warehouse Manager",
						"city": "Prague, Czech Republic",
						"_orbits_last_message": {
							"message": "Your product comes with a one-year warranty. It covers manufacturing defects and provides free servicing. For more information, please refer to the attached warranty document.",
							"message_head": "Product Warranty Information"
						}
					},
					{
						"id": 52,
						"created_at": 1704451485645,
						"name": "Davon Harris",
						"img": "https://i.pravatar.cc/150?img=41",
						"position": "Logistics Coordinator",
						"city": "Athens, Greece",
						"_orbits_last_message": {
							"message": "Mark your calendars for our charity auction on July 5th. Amazing items will be up for bidding, with all proceeds going to local charities. Your participation is welcomed.",
							"message_head": "Charity Auction Announcement"
						}
					},
					{
						"id": 81,
						"created_at": 1704451485678,
						"name": "Joyce Tapia",
						"img": "https://i.pravatar.cc/150?img=70",
						"position": "Geologist",
						"city": "Budapest, Hungary",
						"_orbits_last_message": {
							"message": "As a reminder, our company policy regarding data security has been updated. It is crucial for all employees to review these changes and adhere strictly to them. These guidelines are in place to protect sensitive information and maintain our high standards of confidentiality and integrity. Non-compliance will result in disciplinary action.",
							"message_head": "Company Policy Reminder"
						}
					},
					{
						"id": 4,
						"created_at": 1704446645059,
						"name": "Luna Rodriguez",
						"img": "https://pbs.twimg.com/profile_images/480355580096167936/zexiSHPK_400x400.jpeg",
						"position": "Sales Manager",
						"city": "Eldenhaven, Netherlands",
						"_orbits_last_message": {
							"message": "This is a reminder about the outstanding invoice #7643, due April 20th. Timely payment is appreciated to maintain seamless service. Contact our office for any queries or concerns.",
							"message_head": "Invoice Payment Reminder"
						}
					}
				],
				"contact_date": "2024-07-18"
			},
			{
				"array": [
					{
						"id": 48,
						"created_at": 1704451485617,
						"name": "Yesenia Harmon",
						"img": "https://i.pravatar.cc/150?img=37",
						"position": "Systems Analyst",
						"city": "San Francisco, USA",
						"_orbits_last_message": {
							"message": "You're invited to an exclusive demonstration of our new software on May 8th. Experience first-hand how it can streamline your workflow. RSVP to secure your spot.",
							"message_head": "Product Demo Invitation"
						}
					},
					{
						"id": 40,
						"created_at": 1704451485608,
						"name": "Norah Mack",
						"img": "https://i.pravatar.cc/150?img=29",
						"position": "Civil Engineer",
						"city": "Auckland, New Zealand",
						"_orbits_last_message": {
							"message": "Join us in celebrating our team's hard work at the Employee Appreciation Event on May 5th. Food, fun, and festivities await! Your presence will make it special.",
							"message_head": "Employee Appreciation Event"
						}
					},
					{
						"id": 20,
						"created_at": 1704451485582,
						"name": "Nolan Atkinson",
						"img": "https://i.pravatar.cc/150?img=9",
						"position": "Data Scientist",
						"city": "Toronto, Canada",
						"_orbits_last_message": {
							"message": "You are scheduled for a performance review meeting on April 22nd. It’s an opportunity to discuss achievements, challenges, and career goals. Please prepare to review your annual objectives.",
							"message_head": "Performance Review Meeting"
						}
					},
					{
						"id": 71,
						"created_at": 1704451485667,
						"name": "Skye Macias",
						"img": "https://i.pravatar.cc/150?img=60",
						"position": "Physician Assistant (PA)",
						"city": "Johannesburg, South Africa",
						"_orbits_last_message": {
							"message": "Event logistics update: Venue change for our upcoming seminar. It will now be held at the Downtown Conference Center on April 28th. All other details remain the same.",
							"message_head": "Event Logistics Update"
						}
					},
					{
						"id": 49,
						"created_at": 1704451485618,
						"name": "Theodore Levy",
						"img": "https://i.pravatar.cc/150?img=38",
						"position": "Pharmacist",
						"city": "Shanghai, China",
						"_orbits_last_message": {
							"message": "We apologize for the inconvenience caused and have resolved your complaint regarding our service. As a goodwill gesture, we offer a 10% discount on your next purchase.",
							"message_head": "Customer Complaint Resolution"
						}
					},
					{
						"id": 1,
						"created_at": 1704446112135,
						"name": "Kieran Frost",
						"img": "https://media.licdn.com/dms/image/C4D03AQHXrzTJ_-R0_g/profile-displayphoto-shrink_800_800/0/1647521028027?e=2147483647&v=beta&t=ZiFXOKRYzLCER3E6U67EatQeGQprRU3ss23ialkknAk",
						"position": "Sales Operations Analyst",
						"city": "Verdelia, Spain",
						"_orbits_last_message": {
							"message": "Dear Colleagues, an urgent meeting is scheduled for tomorrow at 10 AM to discuss recent developments. Your attendance is crucial. Please be prepared to provide updates on your respective areas.",
							"message_head": "Urgent Meeting Request"
						}
					}
				],
				"contact_date": "2024-07-17"
			},
			{
				"array": [
					{
						"id": 72,
						"created_at": 1704451485668,
						"name": "Julianna Rios",
						"img": "https://i.pravatar.cc/150?img=61",
						"position": "Market Research Analyst",
						"city": "Kuala Lumpur, Malaysia",
						"_orbits_last_message": {
							"message": "The annual budget presentation is scheduled for April 22nd. It will cover financial planning for the next fiscal year. Your attendance and input are important for our financial strategy.",
							"message_head": "Annual Budget Presentation"
						}
					},
					{
						"id": 15,
						"created_at": 1704451485576,
						"name": "Kaleb Farrell",
						"img": "https://i.pravatar.cc/150?img=4",
						"position": "Registered Nurse (RN)",
						"city": "Paris, France",
						"_orbits_last_message": {
							"message": "Join our volunteer program to make a difference! Opportunities include event management and community outreach. It’s a chance to develop skills and give back. Apply by April 30th.",
							"message_head": "Volunteer Opportunity"
						}
					},
					{
						"id": 4,
						"created_at": 1704446645059,
						"name": "Luna Rodriguez",
						"img": "https://pbs.twimg.com/profile_images/480355580096167936/zexiSHPK_400x400.jpeg",
						"position": "Sales Manager",
						"city": "Eldenhaven, Netherlands",
						"_orbits_last_message": {
							"message": "This is a reminder about the outstanding invoice #7643, due April 20th. Timely payment is appreciated to maintain seamless service. Contact our office for any queries or concerns.",
							"message_head": "Invoice Payment Reminder"
						}
					},
					{
						"id": 13,
						"created_at": 1704451485574,
						"name": "Alessandro Marquez",
						"img": "https://i.pravatar.cc/150?img=2",
						"position": "Marketing Manager",
						"city": "Tokyo, Japan",
						"_orbits_last_message": {
							"message": "Registration for our upcoming workshop on Digital Marketing is now open. This is an excellent opportunity for professional growth. Secure your spot by April 15th. Limited seats available.",
							"message_head": "Workshop Registration"
						}
					},
					{
						"id": 33,
						"created_at": 1704451485598,
						"name": "Geovanni Krueger",
						"img": "https://i.pravatar.cc/150?img=22",
						"position": "Customer Service Manager",
						"city": "Amsterdam, Netherlands",
						"_orbits_last_message": {
							"message": "Our latest marketing campaign has shown promising results, with a 25% increase in engagement. Let's discuss optimizations in our next meeting. Your inputs are valuable!",
							"message_head": "Marketing Campaign Update"
						}
					},
					{
						"id": 48,
						"created_at": 1704451485617,
						"name": "Yesenia Harmon",
						"img": "https://i.pravatar.cc/150?img=37",
						"position": "Systems Analyst",
						"city": "San Francisco, USA",
						"_orbits_last_message": {
							"message": "You're invited to an exclusive demonstration of our new software on May 8th. Experience first-hand how it can streamline your workflow. RSVP to secure your spot.",
							"message_head": "Product Demo Invitation"
						}
					},
					{
						"id": 32,
						"created_at": 1704451485597,
						"name": "Trinity Carpenter",
						"img": "https://i.pravatar.cc/150?img=21",
						"position": "Research Scientist",
						"city": "Cairo, Egypt",
						"_orbits_last_message": {
							"message": "Welcome to our team! Your onboarding starts on April 15th. We've planned a comprehensive schedule to introduce you to our culture and processes. Please check your email for further details.",
							"message_head": "New Employee Onboarding"
						}
					},
					{
						"id": 48,
						"created_at": 1704451485617,
						"name": "Yesenia Harmon",
						"img": "https://i.pravatar.cc/150?img=37",
						"position": "Systems Analyst",
						"city": "San Francisco, USA",
						"_orbits_last_message": {
							"message": "You're invited to an exclusive demonstration of our new software on May 8th. Experience first-hand how it can streamline your workflow. RSVP to secure your spot.",
							"message_head": "Product Demo Invitation"
						}
					},
					{
						"id": 55,
						"created_at": 1704451485649,
						"name": "Finley Conley",
						"img": "https://i.pravatar.cc/150?img=44",
						"position": "Retail Store Manager",
						"city": "Vancouver, Canada",
						"_orbits_last_message": {
							"message": "We're thrilled to announce a new feature in our app, enhancing user experience significantly. It will be live from May 10th. Stay tuned for more details!",
							"message_head": "New Feature Announcement"
						}
					},
					{
						"id": 39,
						"created_at": 1704451485607,
						"name": "Dawson Hayden",
						"img": "https://i.pravatar.cc/150?img=28",
						"position": "Art Director",
						"city": "Jakarta, Indonesia",
						"_orbits_last_message": {
							"message": "We're excited to announce a software upgrade to enhance your user experience. The upgrade will occur on April 25th. Expect new features and improved performance.",
							"message_head": "Software Upgrade Notification"
						}
					},
					{
						"id": 73,
						"created_at": 1704451485669,
						"name": "Ibrahim Cole",
						"img": "https://i.pravatar.cc/150?img=62",
						"position": "Cybersecurity Specialist",
						"city": "Prague, Czech Republic",
						"_orbits_last_message": {
							"message": "We are conducting an Employee Engagement Survey to understand your workplace experience better. Your honest feedback is crucial in shaping our company culture and improving overall job satisfaction. Please take 10 minutes to complete the survey by April 30th. Your responses will remain confidential and are vital for our continuous improvement efforts.",
							"message_head": "Employee Engagement Survey"
						}
					},
					{
						"id": 67,
						"created_at": 1704451485662,
						"name": "Sheldon Osborn",
						"img": "https://i.pravatar.cc/150?img=56",
						"position": "Biotechnologist",
						"city": "Kyiv, Ukraine",
						"_orbits_last_message": {
							"message": "As a thank you to our subscribers, here's an exclusive discount code: SUBS20. Enjoy 20% off your next purchase. Valid until June 30th.",
							"message_head": "Discount Code for Subscribers"
						}
					}
				],
				"contact_date": "2024-07-16"
			},
			{
				"array": [
					{
						"id": 55,
						"created_at": 1704451485649,
						"name": "Finley Conley",
						"img": "https://i.pravatar.cc/150?img=44",
						"position": "Retail Store Manager",
						"city": "Vancouver, Canada",
						"_orbits_last_message": {
							"message": "We're thrilled to announce a new feature in our app, enhancing user experience significantly. It will be live from May 10th. Stay tuned for more details!",
							"message_head": "New Feature Announcement"
						}
					},
					{
						"id": 35,
						"created_at": 1704451485602,
						"name": "Reese Collier",
						"img": "https://i.pravatar.cc/150?img=24",
						"position": "Supply Chain Manager",
						"city": "Helsinki, Finland",
						"_orbits_last_message": {
							"message": "Applications for our annual scholarship program are now open. We're looking for talented and motivated students. Submit your application and supporting documents by May 10th.",
							"message_head": "Scholarship Application"
						}
					},
					{
						"id": 73,
						"created_at": 1704451485669,
						"name": "Ibrahim Cole",
						"img": "https://i.pravatar.cc/150?img=62",
						"position": "Cybersecurity Specialist",
						"city": "Prague, Czech Republic",
						"_orbits_last_message": {
							"message": "We are conducting an Employee Engagement Survey to understand your workplace experience better. Your honest feedback is crucial in shaping our company culture and improving overall job satisfaction. Please take 10 minutes to complete the survey by April 30th. Your responses will remain confidential and are vital for our continuous improvement efforts.",
							"message_head": "Employee Engagement Survey"
						}
					},
					{
						"id": 19,
						"created_at": 1704451485581,
						"name": "Christine Curry",
						"img": "https://i.pravatar.cc/150?img=8",
						"position": "Project Manager",
						"city": "Dubai, United Arab Emirates",
						"_orbits_last_message": {
							"message": "Our new training program in Advanced Analytics starts May 5th. Enhance your skills with expert-led sessions and practical projects. Register by April 20th to secure your place.",
							"message_head": "Training Program Information"
						}
					},
					{
						"id": 18,
						"created_at": 1704451485580,
						"name": "Shirley Watts",
						"img": "https://i.pravatar.cc/150?img=7",
						"position": "Product Manager",
						"city": "Moscow, Russia",
						"_orbits_last_message": {
							"message": "Special offer just for you! Enjoy a 20% discount on our latest range of products until April 30th. Use the code SPRING20 at checkout. Don’t miss out!",
							"message_head": "Product Discount Offer"
						}
					},
					{
						"id": 7,
						"created_at": 1704446963862,
						"name": "Felix Chang",
						"img": "https://med.stanford.edu/services/api/cap/profiles/photocache.238680.jpg",
						"position": "Sales Operations Analyst",
						"city": "Verdelia, Spain",
						"_orbits_last_message": {
							"message": "You are cordially invited to our annual gala event on May 5th. It's an evening of celebration, networking, and recognizing achievements. RSVP by April 20th. We hope to see you there!",
							"message_head": "Event Invitation"
						}
					},
					{
						"id": 76,
						"created_at": 1704451485673,
						"name": "Hanna Savage",
						"img": "https://i.pravatar.cc/150?img=65",
						"position": "Technical Writer",
						"city": "Buenos Aires, Argentina",
						"_orbits_last_message": {
							"message": "This email confirms the successful processing of your recent payment to our vendor, ABC Supplies. The amount of $5,000 was transferred on April 15th. We appreciate your timely handling of financial commitments, ensuring strong and positive relationships with our partners. Please retain this confirmation for your records.",
							"message_head": "Vendor Payment Confirmation"
						}
					},
					{
						"id": 23,
						"created_at": 1704451485586,
						"name": "Erica Fisher",
						"img": "https://i.pravatar.cc/150?img=12",
						"position": "Electrical Engineer",
						"city": "Berlin, Germany",
						"_orbits_last_message": {
							"message": "Join us for our annual charity event on June 5th, supporting local communities. It's a night of fun, fundraising, and making a difference. RSVP by May 20th.",
							"message_head": "Charity Fundraising Event"
						}
					},
					{
						"id": 15,
						"created_at": 1704451485576,
						"name": "Kaleb Farrell",
						"img": "https://i.pravatar.cc/150?img=4",
						"position": "Registered Nurse (RN)",
						"city": "Paris, France",
						"_orbits_last_message": {
							"message": "Join our volunteer program to make a difference! Opportunities include event management and community outreach. It’s a chance to develop skills and give back. Apply by April 30th.",
							"message_head": "Volunteer Opportunity"
						}
					},
					{
						"id": 43,
						"created_at": 1704451485611,
						"name": "Raiden Logan",
						"img": "https://i.pravatar.cc/150?img=32",
						"position": "Attorney",
						"city": "Delhi, India",
						"_orbits_last_message": {
							"message": "This is a reminder of our Annual General Meeting on June 15th. Key agenda items include company performance review and future strategies. Your attendance is important.",
							"message_head": "Annual General Meeting"
						}
					},
					{
						"id": 25,
						"created_at": 1704451485589,
						"name": "Miles Joyce",
						"img": "https://i.pravatar.cc/150?img=14",
						"position": "Accountant",
						"city": "Mexico City, Mexico",
						"_orbits_last_message": {
							"message": "It's time to renew your membership with us! Renew by May 15th to continue enjoying exclusive benefits, access to resources, and networking opportunities.",
							"message_head": "Membership Renewal"
						}
					},
					{
						"id": 10,
						"created_at": 1704447586619,
						"name": "Aria Nguyen",
						"img": "https://media.licdn.com/dms/image/D4E03AQGKZIH0_ppwoQ/profile-displayphoto-shrink_200_200/0/1676946051907?e=2147483647&v=beta&t=L1V_CXCq5L9dM0hlc1nFZDO3nTyXVLZcd5fDAvPU1xM",
						"position": "Sales Manager",
						"city": "Verdelia, Spain",
						"_orbits_last_message": {
							"message": "An exciting networking event is coming up next month, bringing industry leaders and professionals together. It's a great opportunity to connect and explore potential collaborations.",
							"message_head": "Networking Opportunity"
						}
					},
					{
						"id": 9,
						"created_at": 1704447467939,
						"name": "Ezra Caldwell",
						"img": "https://www.zengarage.com.au/wp-content/uploads/2011/09/5249459243_f051e36406_b.jpg",
						"position": "Sales Manager",
						"city": "Aventura, Italy",
						"_orbits_last_message": {
							"message": "As part of our commitment to transparency, we invite you to review our quarterly report. It highlights our achievements, challenges, and financial health over the last three months.",
							"message_head": "Quarterly Report Review"
						}
					},
					{
						"id": 1,
						"created_at": 1704446112135,
						"name": "Kieran Frost",
						"img": "https://media.licdn.com/dms/image/C4D03AQHXrzTJ_-R0_g/profile-displayphoto-shrink_800_800/0/1647521028027?e=2147483647&v=beta&t=ZiFXOKRYzLCER3E6U67EatQeGQprRU3ss23ialkknAk",
						"position": "Sales Operations Analyst",
						"city": "Verdelia, Spain",
						"_orbits_last_message": {
							"message": "Dear Colleagues, an urgent meeting is scheduled for tomorrow at 10 AM to discuss recent developments. Your attendance is crucial. Please be prepared to provide updates on your respective areas.",
							"message_head": "Urgent Meeting Request"
						}
					},
					{
						"id": 12,
						"created_at": 1704451485572,
						"name": "Ethen Hernandez",
						"img": "https://i.pravatar.cc/150?img=1",
						"position": "Chief Executive Officer (CEO)",
						"city": "New York City, USA",
						"_orbits_last_message": {
							"message": "We are delighted to extend a job offer for the position of Marketing Manager. The package includes a competitive salary and benefits. Please review the attached terms and respond by April 25th.",
							"message_head": "Job Offer"
						}
					},
					{
						"id": 62,
						"created_at": 1704451485656,
						"name": "Mallory Frye",
						"img": "https://i.pravatar.cc/150?img=51",
						"position": "Chief Financial Officer (CFO)",
						"city": "Bucharest, Romania",
						"_orbits_last_message": {
							"message": "Our latest investor relations update highlights significant growth in the past quarter and outlines future investment plans. Detailed report attached for your review.",
							"message_head": "Investor Relations Update"
						}
					},
					{
						"id": 16,
						"created_at": 1704451485577,
						"name": "Steven Johns",
						"img": "https://i.pravatar.cc/150?img=5",
						"position": "Financial Analyst",
						"city": "Sydney, Australia",
						"_orbits_last_message": {
							"message": "Check out our latest company newsletter for updates on our community initiatives, upcoming events, and employee achievements. Your feedback is always welcome!",
							"message_head": "Company Newsletter"
						}
					},
					{
						"id": 48,
						"created_at": 1704451485617,
						"name": "Yesenia Harmon",
						"img": "https://i.pravatar.cc/150?img=37",
						"position": "Systems Analyst",
						"city": "San Francisco, USA",
						"_orbits_last_message": {
							"message": "You're invited to an exclusive demonstration of our new software on May 8th. Experience first-hand how it can streamline your workflow. RSVP to secure your spot.",
							"message_head": "Product Demo Invitation"
						}
					}
				],
				"contact_date": "2024-07-15"
			},
			{
				"array": [
					{
						"id": 28,
						"created_at": 1704451485592,
						"name": "Jaxon Coleman",
						"img": "https://i.pravatar.cc/150?img=17",
						"position": "Mechanical Engineer",
						"city": "Buenos Aires, Argentina",
						"_orbits_last_message": {
							"message": "Registration for the Global Tech Conference is now open. Join us from July 10-12 for a series of insightful talks and networking opportunities. Early bird rates until May 15th.",
							"message_head": "Conference Registration"
						}
					},
					{
						"id": 27,
						"created_at": 1704451485591,
						"name": "Gabriel Pratt",
						"img": "https://i.pravatar.cc/150?img=16",
						"position": "Quality Assurance Analyst",
						"city": "Seoul, South Korea",
						"_orbits_last_message": {
							"message": "We value your feedback and would love to feature your experience with our services. If you're interested in sharing a testimonial, please reply by April 28th.",
							"message_head": "Customer Testimonial Request"
						}
					},
					{
						"id": 53,
						"created_at": 1704451485646,
						"name": "Carlie Cameron",
						"img": "https://i.pravatar.cc/150?img=42",
						"position": "Brand Manager",
						"city": "Copenhagen, Denmark",
						"_orbits_last_message": {
							"message": "Our Volunteer Appreciation Event on April 30th celebrates your dedication and hard work. Join us for an evening of gratitude, entertainment, and dinner. Your presence matters.",
							"message_head": "Volunteer Appreciation Event"
						}
					},
					{
						"id": 1,
						"created_at": 1704446112135,
						"name": "Kieran Frost",
						"img": "https://media.licdn.com/dms/image/C4D03AQHXrzTJ_-R0_g/profile-displayphoto-shrink_800_800/0/1647521028027?e=2147483647&v=beta&t=ZiFXOKRYzLCER3E6U67EatQeGQprRU3ss23ialkknAk",
						"position": "Sales Operations Analyst",
						"city": "Verdelia, Spain",
						"_orbits_last_message": {
							"message": "Dear Colleagues, an urgent meeting is scheduled for tomorrow at 10 AM to discuss recent developments. Your attendance is crucial. Please be prepared to provide updates on your respective areas.",
							"message_head": "Urgent Meeting Request"
						}
					}
				],
				"contact_date": "2024-07-14"
			},
			{
				"array": [
					{
						"id": 22,
						"created_at": 1704451485585,
						"name": "Chase Mays",
						"img": "https://i.pravatar.cc/150?img=11",
						"position": "Graphic Designer",
						"city": "Mumbai, India",
						"_orbits_last_message": {
							"message": "Your request for vacation from May 10th to May 20th has been approved. Please ensure your responsibilities are covered during your absence. Have a great trip!",
							"message_head": "Vacation Request Approval"
						}
					},
					{
						"id": 25,
						"created_at": 1704451485589,
						"name": "Miles Joyce",
						"img": "https://i.pravatar.cc/150?img=14",
						"position": "Accountant",
						"city": "Mexico City, Mexico",
						"_orbits_last_message": {
							"message": "It's time to renew your membership with us! Renew by May 15th to continue enjoying exclusive benefits, access to resources, and networking opportunities.",
							"message_head": "Membership Renewal"
						}
					},
					{
						"id": 6,
						"created_at": 1704446809763,
						"name": "Sierra Morgan",
						"img": "https://media.licdn.com/dms/image/C4E03AQEWiLbQPBYpDw/profile-displayphoto-shrink_800_800/0/1650645413526?e=2147483647&v=beta&t=Sq8orl1pfuFsWls2LJ3qngUlUuNW8ULr4Wu6SQV6Phw",
						"position": "Business Development Specialist",
						"city": "Norhaven, Sweden",
						"_orbits_last_message": {
							"message": "We are thrilled to announce the launch of our new product next month. It represents a significant step forward in innovation and customer satisfaction. Your support in this initiative is invaluable.",
							"message_head": "New Product Launch"
						}
					},
					{
						"id": 31,
						"created_at": 1704451485596,
						"name": "Justine Booker",
						"img": "https://i.pravatar.cc/150?img=20",
						"position": "IT Consultant",
						"city": "Bangkok, Thailand",
						"_orbits_last_message": {
							"message": "You're invited to our exclusive webinar on 'Future Trends in E-commerce' on May 8th. Gain insights from industry experts. Reserve your spot now – limited seats available.",
							"message_head": "Webinar Invitation"
						}
					},
					{
						"id": 73,
						"created_at": 1704451485669,
						"name": "Ibrahim Cole",
						"img": "https://i.pravatar.cc/150?img=62",
						"position": "Cybersecurity Specialist",
						"city": "Prague, Czech Republic",
						"_orbits_last_message": {
							"message": "We are conducting an Employee Engagement Survey to understand your workplace experience better. Your honest feedback is crucial in shaping our company culture and improving overall job satisfaction. Please take 10 minutes to complete the survey by April 30th. Your responses will remain confidential and are vital for our continuous improvement efforts.",
							"message_head": "Employee Engagement Survey"
						}
					},
					{
						"id": 1,
						"created_at": 1704446112135,
						"name": "Kieran Frost",
						"img": "https://media.licdn.com/dms/image/C4D03AQHXrzTJ_-R0_g/profile-displayphoto-shrink_800_800/0/1647521028027?e=2147483647&v=beta&t=ZiFXOKRYzLCER3E6U67EatQeGQprRU3ss23ialkknAk",
						"position": "Sales Operations Analyst",
						"city": "Verdelia, Spain",
						"_orbits_last_message": {
							"message": "Dear Colleagues, an urgent meeting is scheduled for tomorrow at 10 AM to discuss recent developments. Your attendance is crucial. Please be prepared to provide updates on your respective areas.",
							"message_head": "Urgent Meeting Request"
						}
					},
					{
						"id": 42,
						"created_at": 1704451485610,
						"name": "Beau Chaney",
						"img": "https://i.pravatar.cc/150?img=31",
						"position": "Financial Planner",
						"city": "Zurich, Switzerland",
						"_orbits_last_message": {
							"message": "We are exploring new supplier partnerships to enhance our product line. If your company offers innovative solutions, we would love to hear from you. Let's discuss potential collaboration.",
							"message_head": "Supplier Partnership Inquiry"
						}
					},
					{
						"id": 47,
						"created_at": 1704451485616,
						"name": "Dax Jensen",
						"img": "https://i.pravatar.cc/150?img=36",
						"position": "Public Relations Specialist",
						"city": "Budapest, Hungary",
						"_orbits_last_message": {
							"message": "Congratulations to Jane Doe, our Employee of the Month! Jane's exceptional dedication and teamwork have contributed greatly to our project's success. Well done, Jane!",
							"message_head": "Employee of the Month"
						}
					},
					{
						"id": 69,
						"created_at": 1704451485665,
						"name": "Payton Kelly",
						"img": "https://i.pravatar.cc/150?img=58",
						"position": "Event Planner",
						"city": "Casablanca, Morocco",
						"_orbits_last_message": {
							"message": "For any emergencies, please refer to the updated contact list attached. It includes key contacts for IT, HR, and facilities. Keep this information handy.",
							"message_head": "Emergency Contact Information"
						}
					},
					{
						"id": 39,
						"created_at": 1704451485607,
						"name": "Dawson Hayden",
						"img": "https://i.pravatar.cc/150?img=28",
						"position": "Art Director",
						"city": "Jakarta, Indonesia",
						"_orbits_last_message": {
							"message": "We're excited to announce a software upgrade to enhance your user experience. The upgrade will occur on April 25th. Expect new features and improved performance.",
							"message_head": "Software Upgrade Notification"
						}
					},
					{
						"id": 53,
						"created_at": 1704451485646,
						"name": "Carlie Cameron",
						"img": "https://i.pravatar.cc/150?img=42",
						"position": "Brand Manager",
						"city": "Copenhagen, Denmark",
						"_orbits_last_message": {
							"message": "Our Volunteer Appreciation Event on April 30th celebrates your dedication and hard work. Join us for an evening of gratitude, entertainment, and dinner. Your presence matters.",
							"message_head": "Volunteer Appreciation Event"
						}
					},
					{
						"id": 49,
						"created_at": 1704451485618,
						"name": "Theodore Levy",
						"img": "https://i.pravatar.cc/150?img=38",
						"position": "Pharmacist",
						"city": "Shanghai, China",
						"_orbits_last_message": {
							"message": "We apologize for the inconvenience caused and have resolved your complaint regarding our service. As a goodwill gesture, we offer a 10% discount on your next purchase.",
							"message_head": "Customer Complaint Resolution"
						}
					},
					{
						"id": 48,
						"created_at": 1704451485617,
						"name": "Yesenia Harmon",
						"img": "https://i.pravatar.cc/150?img=37",
						"position": "Systems Analyst",
						"city": "San Francisco, USA",
						"_orbits_last_message": {
							"message": "You're invited to an exclusive demonstration of our new software on May 8th. Experience first-hand how it can streamline your workflow. RSVP to secure your spot.",
							"message_head": "Product Demo Invitation"
						}
					},
					{
						"id": 36,
						"created_at": 1704451485603,
						"name": "Jaiden Charles",
						"img": "https://i.pravatar.cc/150?img=25",
						"position": "Marketing Coordinator",
						"city": "Vienna, Austria",
						"_orbits_last_message": {
							"message": "Please find attached the agenda for our upcoming board meeting on April 20th. Key points include financial forecasts and strategic planning. Your timely feedback is appreciated.",
							"message_head": "Board Meeting Agenda"
						}
					},
					{
						"id": 38,
						"created_at": 1704451485606,
						"name": "Joslyn Bauer",
						"img": "https://i.pravatar.cc/150?img=27",
						"position": "Investment Banker",
						"city": "Madrid, Spain",
						"_orbits_last_message": {
							"message": "An important update to our company policy will be implemented on May 1st. It is essential that all employees familiarize themselves with these changes. Details attached.",
							"message_head": "Important Policy Update"
						}
					},
					{
						"id": 68,
						"created_at": 1704451485664,
						"name": "Freddy Zamora",
						"img": "https://i.pravatar.cc/150?img=57",
						"position": "Inventory Control Specialist",
						"city": "Abu Dhabi, United Arab Emirates",
						"_orbits_last_message": {
							"message": "Join us in celebrating our company's 10th anniversary! We've achieved significant milestones thanks to our team's dedication. Event details to be shared soon.",
							"message_head": "Company Milestone Celebration"
						}
					},
					{
						"id": 46,
						"created_at": 1704451485614,
						"name": "Ruben Pollard",
						"img": "https://i.pravatar.cc/150?img=35",
						"position": "Hospital Administrator",
						"city": "Warsaw, Poland",
						"_orbits_last_message": {
							"message": "We require immediate IT support for a system outage affecting multiple departments. Please prioritize this request to minimize disruptions. Your prompt assistance is crucial.",
							"message_head": "Urgent IT Support Request"
						}
					},
					{
						"id": 72,
						"created_at": 1704451485668,
						"name": "Julianna Rios",
						"img": "https://i.pravatar.cc/150?img=61",
						"position": "Market Research Analyst",
						"city": "Kuala Lumpur, Malaysia",
						"_orbits_last_message": {
							"message": "The annual budget presentation is scheduled for April 22nd. It will cover financial planning for the next fiscal year. Your attendance and input are important for our financial strategy.",
							"message_head": "Annual Budget Presentation"
						}
					}
				],
				"contact_date": "2024-07-13"
			},
			{
				"array": [
					{
						"id": 70,
						"created_at": 1704451485666,
						"name": "Corbin Mccormick",
						"img": "https://i.pravatar.cc/150?img=59",
						"position": "Network Administrator",
						"city": "Munich, Germany",
						"_orbits_last_message": {
							"message": "Important product recall notice: Due to a manufacturing defect, we are recalling Product X. Please stop using it immediately and follow the instructions for a safe return process.",
							"message_head": "Product Recall Instructions"
						}
					},
					{
						"id": 35,
						"created_at": 1704451485602,
						"name": "Reese Collier",
						"img": "https://i.pravatar.cc/150?img=24",
						"position": "Supply Chain Manager",
						"city": "Helsinki, Finland",
						"_orbits_last_message": {
							"message": "Applications for our annual scholarship program are now open. We're looking for talented and motivated students. Submit your application and supporting documents by May 10th.",
							"message_head": "Scholarship Application"
						}
					},
					{
						"id": 24,
						"created_at": 1704451485587,
						"name": "Ayana Hatfield",
						"img": "https://i.pravatar.cc/150?img=13",
						"position": "Operations Manager",
						"city": "Cape Town, South Africa",
						"_orbits_last_message": {
							"message": "Please be aware of an ongoing emergency situation in our downtown office. All employees are advised to work remotely until further notice. Safety is our top priority.",
							"message_head": "Emergency Notification"
						}
					},
					{
						"id": 30,
						"created_at": 1704451485594,
						"name": "Karter Moody",
						"img": "https://i.pravatar.cc/150?img=19",
						"position": "Business Development Manager",
						"city": "Istanbul, Turkey",
						"_orbits_last_message": {
							"message": "We're pleased to share our quarterly sales results. Thanks to our team's effort, we've seen a 15% increase in sales. Detailed report and analysis attached.",
							"message_head": "Quarterly Sales Results"
						}
					},
					{
						"id": 41,
						"created_at": 1704451485609,
						"name": "Giada Christian",
						"img": "https://i.pravatar.cc/150?img=30",
						"position": "Warehouse Manager",
						"city": "Prague, Czech Republic",
						"_orbits_last_message": {
							"message": "Your product comes with a one-year warranty. It covers manufacturing defects and provides free servicing. For more information, please refer to the attached warranty document.",
							"message_head": "Product Warranty Information"
						}
					},
					{
						"id": 6,
						"created_at": 1704446809763,
						"name": "Sierra Morgan",
						"img": "https://media.licdn.com/dms/image/C4E03AQEWiLbQPBYpDw/profile-displayphoto-shrink_800_800/0/1650645413526?e=2147483647&v=beta&t=Sq8orl1pfuFsWls2LJ3qngUlUuNW8ULr4Wu6SQV6Phw",
						"position": "Business Development Specialist",
						"city": "Norhaven, Sweden",
						"_orbits_last_message": {
							"message": "We are thrilled to announce the launch of our new product next month. It represents a significant step forward in innovation and customer satisfaction. Your support in this initiative is invaluable.",
							"message_head": "New Product Launch"
						}
					},
					{
						"id": 73,
						"created_at": 1704451485669,
						"name": "Ibrahim Cole",
						"img": "https://i.pravatar.cc/150?img=62",
						"position": "Cybersecurity Specialist",
						"city": "Prague, Czech Republic",
						"_orbits_last_message": {
							"message": "We are conducting an Employee Engagement Survey to understand your workplace experience better. Your honest feedback is crucial in shaping our company culture and improving overall job satisfaction. Please take 10 minutes to complete the survey by April 30th. Your responses will remain confidential and are vital for our continuous improvement efforts.",
							"message_head": "Employee Engagement Survey"
						}
					},
					{
						"id": 1,
						"created_at": 1704446112135,
						"name": "Kieran Frost",
						"img": "https://media.licdn.com/dms/image/C4D03AQHXrzTJ_-R0_g/profile-displayphoto-shrink_800_800/0/1647521028027?e=2147483647&v=beta&t=ZiFXOKRYzLCER3E6U67EatQeGQprRU3ss23ialkknAk",
						"position": "Sales Operations Analyst",
						"city": "Verdelia, Spain",
						"_orbits_last_message": {
							"message": "Dear Colleagues, an urgent meeting is scheduled for tomorrow at 10 AM to discuss recent developments. Your attendance is crucial. Please be prepared to provide updates on your respective areas.",
							"message_head": "Urgent Meeting Request"
						}
					},
					{
						"id": 70,
						"created_at": 1704451485666,
						"name": "Corbin Mccormick",
						"img": "https://i.pravatar.cc/150?img=59",
						"position": "Network Administrator",
						"city": "Munich, Germany",
						"_orbits_last_message": {
							"message": "Important product recall notice: Due to a manufacturing defect, we are recalling Product X. Please stop using it immediately and follow the instructions for a safe return process.",
							"message_head": "Product Recall Instructions"
						}
					},
					{
						"id": 29,
						"created_at": 1704451485593,
						"name": "Reynaldo Brandt",
						"img": "https://i.pravatar.cc/150?img=18",
						"position": "Healthcare Administrator",
						"city": "Stockholm, Sweden",
						"_orbits_last_message": {
							"message": "Important notice: We're recalling Product X due to a potential safety issue. If you've purchased this item, please stop using it and follow the return instructions attached.",
							"message_head": "Product Recall Notice"
						}
					},
					{
						"id": 55,
						"created_at": 1704451485649,
						"name": "Finley Conley",
						"img": "https://i.pravatar.cc/150?img=44",
						"position": "Retail Store Manager",
						"city": "Vancouver, Canada",
						"_orbits_last_message": {
							"message": "We're thrilled to announce a new feature in our app, enhancing user experience significantly. It will be live from May 10th. Stay tuned for more details!",
							"message_head": "New Feature Announcement"
						}
					},
					{
						"id": 58,
						"created_at": 1704451485652,
						"name": "Amy Boone",
						"img": "https://i.pravatar.cc/150?img=47",
						"position": "User Interface Designer",
						"city": "Lima, Peru",
						"_orbits_last_message": {
							"message": "Our fundraising campaign has raised over $50,000 so far, thanks to your generous contributions. These funds will support our community education project. Let's keep the momentum going!",
							"message_head": "Fundraising Campaign Update"
						}
					},
					{
						"id": 64,
						"created_at": 1704451485659,
						"name": "Gia Bautista",
						"img": "https://i.pravatar.cc/150?img=53",
						"position": "Hotel General Manager",
						"city": "Nairobi, Kenya",
						"_orbits_last_message": {
							"message": "We're launching a customer loyalty program, offering exclusive rewards and discounts. Sign up to start earning points on your purchases and enjoy member-only benefits.",
							"message_head": "Customer Loyalty Program"
						}
					},
					{
						"id": 39,
						"created_at": 1704451485607,
						"name": "Dawson Hayden",
						"img": "https://i.pravatar.cc/150?img=28",
						"position": "Art Director",
						"city": "Jakarta, Indonesia",
						"_orbits_last_message": {
							"message": "We're excited to announce a software upgrade to enhance your user experience. The upgrade will occur on April 25th. Expect new features and improved performance.",
							"message_head": "Software Upgrade Notification"
						}
					},
					{
						"id": 21,
						"created_at": 1704451485584,
						"name": "Kian Oliver",
						"img": "https://i.pravatar.cc/150?img=10",
						"position": "Sales Representative",
						"city": "Beijing, China",
						"_orbits_last_message": {
							"message": "We invite proposals for our upcoming renewable energy project. Include methodology, budget, and timelines. Submission deadline: April 30th. Looking forward to innovative solutions.",
							"message_head": "Request for Proposal"
						}
					},
					{
						"id": 24,
						"created_at": 1704451485587,
						"name": "Ayana Hatfield",
						"img": "https://i.pravatar.cc/150?img=13",
						"position": "Operations Manager",
						"city": "Cape Town, South Africa",
						"_orbits_last_message": {
							"message": "Please be aware of an ongoing emergency situation in our downtown office. All employees are advised to work remotely until further notice. Safety is our top priority.",
							"message_head": "Emergency Notification"
						}
					},
					{
						"id": 13,
						"created_at": 1704451485574,
						"name": "Alessandro Marquez",
						"img": "https://i.pravatar.cc/150?img=2",
						"position": "Marketing Manager",
						"city": "Tokyo, Japan",
						"_orbits_last_message": {
							"message": "Registration for our upcoming workshop on Digital Marketing is now open. This is an excellent opportunity for professional growth. Secure your spot by April 15th. Limited seats available.",
							"message_head": "Workshop Registration"
						}
					},
					{
						"id": 23,
						"created_at": 1704451485586,
						"name": "Erica Fisher",
						"img": "https://i.pravatar.cc/150?img=12",
						"position": "Electrical Engineer",
						"city": "Berlin, Germany",
						"_orbits_last_message": {
							"message": "Join us for our annual charity event on June 5th, supporting local communities. It's a night of fun, fundraising, and making a difference. RSVP by May 20th.",
							"message_head": "Charity Fundraising Event"
						}
					}
				],
				"contact_date": "2024-07-12"
			},
			{
				"array": [
					{
						"id": 37,
						"created_at": 1704451485604,
						"name": "Evan Nguyen",
						"img": "https://i.pravatar.cc/150?img=26",
						"position": "Nurse Practitioner (NP)",
						"city": "Nairobi, Kenya",
						"_orbits_last_message": {
							"message": "We are seeking sponsorship for our community event in June. This is an excellent opportunity for brand exposure. Please review the attached proposal for more details.",
							"message_head": "Event Sponsorship Proposal"
						}
					},
					{
						"id": 59,
						"created_at": 1704451485653,
						"name": "Nathalia Gibbs",
						"img": "https://i.pravatar.cc/150?img=48",
						"position": "Chemical Engineer",
						"city": "Warsaw, Poland",
						"_orbits_last_message": {
							"message": "We appreciate your interest in joining our team. Your job application is currently under review, and we expect to update you on the status by April 20th.",
							"message_head": "Job Application Status"
						}
					},
					{
						"id": 64,
						"created_at": 1704451485659,
						"name": "Gia Bautista",
						"img": "https://i.pravatar.cc/150?img=53",
						"position": "Hotel General Manager",
						"city": "Nairobi, Kenya",
						"_orbits_last_message": {
							"message": "We're launching a customer loyalty program, offering exclusive rewards and discounts. Sign up to start earning points on your purchases and enjoy member-only benefits.",
							"message_head": "Customer Loyalty Program"
						}
					},
					{
						"id": 1,
						"created_at": 1704446112135,
						"name": "Kieran Frost",
						"img": "https://media.licdn.com/dms/image/C4D03AQHXrzTJ_-R0_g/profile-displayphoto-shrink_800_800/0/1647521028027?e=2147483647&v=beta&t=ZiFXOKRYzLCER3E6U67EatQeGQprRU3ss23ialkknAk",
						"position": "Sales Operations Analyst",
						"city": "Verdelia, Spain",
						"_orbits_last_message": {
							"message": "Dear Colleagues, an urgent meeting is scheduled for tomorrow at 10 AM to discuss recent developments. Your attendance is crucial. Please be prepared to provide updates on your respective areas.",
							"message_head": "Urgent Meeting Request"
						}
					},
					{
						"id": 10,
						"created_at": 1704447586619,
						"name": "Aria Nguyen",
						"img": "https://media.licdn.com/dms/image/D4E03AQGKZIH0_ppwoQ/profile-displayphoto-shrink_200_200/0/1676946051907?e=2147483647&v=beta&t=L1V_CXCq5L9dM0hlc1nFZDO3nTyXVLZcd5fDAvPU1xM",
						"position": "Sales Manager",
						"city": "Verdelia, Spain",
						"_orbits_last_message": {
							"message": "An exciting networking event is coming up next month, bringing industry leaders and professionals together. It's a great opportunity to connect and explore potential collaborations.",
							"message_head": "Networking Opportunity"
						}
					},
					{
						"id": 72,
						"created_at": 1704451485668,
						"name": "Julianna Rios",
						"img": "https://i.pravatar.cc/150?img=61",
						"position": "Market Research Analyst",
						"city": "Kuala Lumpur, Malaysia",
						"_orbits_last_message": {
							"message": "The annual budget presentation is scheduled for April 22nd. It will cover financial planning for the next fiscal year. Your attendance and input are important for our financial strategy.",
							"message_head": "Annual Budget Presentation"
						}
					},
					{
						"id": 72,
						"created_at": 1704451485668,
						"name": "Julianna Rios",
						"img": "https://i.pravatar.cc/150?img=61",
						"position": "Market Research Analyst",
						"city": "Kuala Lumpur, Malaysia",
						"_orbits_last_message": {
							"message": "The annual budget presentation is scheduled for April 22nd. It will cover financial planning for the next fiscal year. Your attendance and input are important for our financial strategy.",
							"message_head": "Annual Budget Presentation"
						}
					},
					{
						"id": 15,
						"created_at": 1704451485576,
						"name": "Kaleb Farrell",
						"img": "https://i.pravatar.cc/150?img=4",
						"position": "Registered Nurse (RN)",
						"city": "Paris, France",
						"_orbits_last_message": {
							"message": "Join our volunteer program to make a difference! Opportunities include event management and community outreach. It’s a chance to develop skills and give back. Apply by April 30th.",
							"message_head": "Volunteer Opportunity"
						}
					},
					{
						"id": 15,
						"created_at": 1704451485576,
						"name": "Kaleb Farrell",
						"img": "https://i.pravatar.cc/150?img=4",
						"position": "Registered Nurse (RN)",
						"city": "Paris, France",
						"_orbits_last_message": {
							"message": "Join our volunteer program to make a difference! Opportunities include event management and community outreach. It’s a chance to develop skills and give back. Apply by April 30th.",
							"message_head": "Volunteer Opportunity"
						}
					},
					{
						"id": 3,
						"created_at": 1704446491988,
						"name": "Jasper Malone",
						"img": "https://m.media-amazon.com/images/M/MV5BMmMzYjhlMTgtMjJlNC00Mzg2LWExM2UtNzcyN2Y2MmQxNjFiXkEyXkFqcGdeQXVyMDk0NDIwNQ@@._V1_FMjpg_UX1000_.jpg",
						"position": "Sales Representative",
						"city": "Norhaven, Sweden",
						"_orbits_last_message": {
							"message": "We are pleased to confirm your job interview for the marketing position on April 15th. This is an opportunity to showcase your skills and experience. Looking forward to meeting you.",
							"message_head": "Job Interview Confirmation"
						}
					},
					{
						"id": 6,
						"created_at": 1704446809763,
						"name": "Sierra Morgan",
						"img": "https://media.licdn.com/dms/image/C4E03AQEWiLbQPBYpDw/profile-displayphoto-shrink_800_800/0/1650645413526?e=2147483647&v=beta&t=Sq8orl1pfuFsWls2LJ3qngUlUuNW8ULr4Wu6SQV6Phw",
						"position": "Business Development Specialist",
						"city": "Norhaven, Sweden",
						"_orbits_last_message": {
							"message": "We are thrilled to announce the launch of our new product next month. It represents a significant step forward in innovation and customer satisfaction. Your support in this initiative is invaluable.",
							"message_head": "New Product Launch"
						}
					},
					{
						"id": 3,
						"created_at": 1704446491988,
						"name": "Jasper Malone",
						"img": "https://m.media-amazon.com/images/M/MV5BMmMzYjhlMTgtMjJlNC00Mzg2LWExM2UtNzcyN2Y2MmQxNjFiXkEyXkFqcGdeQXVyMDk0NDIwNQ@@._V1_FMjpg_UX1000_.jpg",
						"position": "Sales Representative",
						"city": "Norhaven, Sweden",
						"_orbits_last_message": {
							"message": "We are pleased to confirm your job interview for the marketing position on April 15th. This is an opportunity to showcase your skills and experience. Looking forward to meeting you.",
							"message_head": "Job Interview Confirmation"
						}
					},
					{
						"id": 2,
						"created_at": 1704446384169,
						"name": "Isabella Hayes",
						"img": "data:image/jpeg;base64,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",
						"position": "Account Executive",
						"city": "Aventura, Italy",
						"_orbits_last_message": {
							"message": "Greetings Team, I'm pleased to report significant progress in our current project. Key milestones have been achieved ahead of schedule, reflecting our team's hard work and dedication.",
							"message_head": "Project Update"
						}
					},
					{
						"id": 73,
						"created_at": 1704451485669,
						"name": "Ibrahim Cole",
						"img": "https://i.pravatar.cc/150?img=62",
						"position": "Cybersecurity Specialist",
						"city": "Prague, Czech Republic",
						"_orbits_last_message": {
							"message": "We are conducting an Employee Engagement Survey to understand your workplace experience better. Your honest feedback is crucial in shaping our company culture and improving overall job satisfaction. Please take 10 minutes to complete the survey by April 30th. Your responses will remain confidential and are vital for our continuous improvement efforts.",
							"message_head": "Employee Engagement Survey"
						}
					},
					{
						"id": 76,
						"created_at": 1704451485673,
						"name": "Hanna Savage",
						"img": "https://i.pravatar.cc/150?img=65",
						"position": "Technical Writer",
						"city": "Buenos Aires, Argentina",
						"_orbits_last_message": {
							"message": "This email confirms the successful processing of your recent payment to our vendor, ABC Supplies. The amount of $5,000 was transferred on April 15th. We appreciate your timely handling of financial commitments, ensuring strong and positive relationships with our partners. Please retain this confirmation for your records.",
							"message_head": "Vendor Payment Confirmation"
						}
					},
					{
						"id": 68,
						"created_at": 1704451485664,
						"name": "Freddy Zamora",
						"img": "https://i.pravatar.cc/150?img=57",
						"position": "Inventory Control Specialist",
						"city": "Abu Dhabi, United Arab Emirates",
						"_orbits_last_message": {
							"message": "Join us in celebrating our company's 10th anniversary! We've achieved significant milestones thanks to our team's dedication. Event details to be shared soon.",
							"message_head": "Company Milestone Celebration"
						}
					},
					{
						"id": 49,
						"created_at": 1704451485618,
						"name": "Theodore Levy",
						"img": "https://i.pravatar.cc/150?img=38",
						"position": "Pharmacist",
						"city": "Shanghai, China",
						"_orbits_last_message": {
							"message": "We apologize for the inconvenience caused and have resolved your complaint regarding our service. As a goodwill gesture, we offer a 10% discount on your next purchase.",
							"message_head": "Customer Complaint Resolution"
						}
					}
				],
				"contact_date": "2024-07-11"
			}
		]
    );
    
    const sortedOrbits = computed(() => {
        return [...orbits.value].sort((a, b) =>
            new Date(b.contact_date).getTime() - new Date(a.contact_date).getTime()
        );
    });

</script>

<style module>
@media only screen and (-webkit-min-device-pixel-ratio: 2),
only screen and (min-resolution: 192dpi) {
     /* Styles for mobile devices and retina displays */

    html, :host{
        font-family: Inter, sans-serif;
        font-size: clamp(16px, calc(6px + 0.5vw), 18px); /* Now 1rem = 16px at -webkit-min-device-pixel-ratio: 2 viewport width */
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-primary);
    }
}

.orbitsContainer {
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    width: 100vw;
    height: 100vh;
}
</style>
