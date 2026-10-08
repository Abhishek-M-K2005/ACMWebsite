# db/seeds.rb

puts "🧹 Clearing old data..."
# Clear in reverse order of dependencies to avoid foreign key constraint errors
ProjectProposalUser.destroy_all
ProjectProposal.destroy_all
Project.destroy_all
Year.destroy_all
EventRegistration.destroy_all
Event.destroy_all
BlogCategory.destroy_all
Blog.destroy_all
Category.destroy_all
Member.destroy_all
User.destroy_all
CorePosition.destroy_all
Sig.destroy_all


puts "🌱 Seeding Database..."

# 1. SIGs (Special Interest Groups)
sanganitra = Sig.create!(name: "Sanganitra", title: "Computer Science SIG", description: "Exploring software and algorithms.")
yantrika = Sig.create!(name: "Yantrika", title: "Mechanical SIG", description: "Building the physical future.")
vidyuth = Sig.create!(name: "Vidyuth", title: "Electrical SIG", description: "Powering innovations.")
kaaryavarta = Sig.create!(name: "Kaaryavarta", title: "Management SIG", description: "Leading and organizing.")
saahitya = Sig.create!(name: "Saahitya", title: "Literary & Research SIG", description: "Technical publications, newsletters and research writing.")
abhivyakta = Sig.create!(name: "Abhivyakta", title: "Media & Design SIG", description: "Digital art, branding and front-end aesthetics.")
krutagnata = Sig.create!(name: "Krutagnata", title: "Social Initiative SIG", description: "Tech-driven community outreach and impact.")
acmw = Sig.create!(name: "ACMW", title: "Women in Technology", description: "Supporting and empowering women in computing and technology.")

# 2. Core Positions
faculty_advisor = CorePosition.create!(name: "Faculty Advisor", description: "Guiding faculty member for the chapter.")
chairman = CorePosition.create!(name: "Chairman", description: "Head of the student chapter.")
president = CorePosition.create!(name: "President", description: "Leads the executive committee.")
convenor = CorePosition.create!(name: "Convenor", description: "Organizes and coordinates major club events.")
webmaster = CorePosition.create!(name: "Webmaster", description: "Manages the club's website and digital infrastructure.")

# 3. Users (Test accounts for your Login portal)
advisor_user = User.create!(
  name: "Dr. Smith", 
  email: "advisor@nitk.edu", 
  password: "password123", 
  sig: sanganitra, 
  core_position: faculty_advisor
)

president_user = User.create!(
  name: "Alice Johnson", 
  email: "president@nitk.edu", 
  password: "password123", 
  sig: yantrika, 
  core_position: president
)

webmaster_user = User.create!(
  name: "Bob Code", 
  email: "webmaster@nitk.edu", 
  password: "password123", 
  sig: sanganitra, 
  core_position: webmaster
)

convenor_user = User.create!(
  name: "Charlie Event", 
  email: "convenor@nitk.edu", 
  password: "password123", 
  sig: kaaryavarta, 
  core_position: convenor
)

# 4. Academic Years (Dynamic based on your controller logic)
current_date = Time.current
current_academic_year = current_date.month >= 7 ? current_date.year : current_date.year - 1

year_current = Year.create!(year: current_academic_year)
year_past = Year.create!(year: current_academic_year - 1)

# 5. Project Expo (Completed Projects)
Project.create!(
  title: "ACM Club Website Redesign",
  sig: sanganitra,
  year: year_current, # Belongs to 'years' table via year_id
  duration: "3 Months",
  description: "A full-stack React and Rails monorepo.",
  method: "Agile Development",
  results: "Successfully deployed.",
  meet_link: "https://meet.google.com/abc-defg-hij"
)

Project.create!(
  title: "Autonomous Drone Navigation",
  sig: yantrika,
  year: year_past,
  duration: "6 Months",
  description: "Drone built from scratch using ROS and OpenCV.",
  method: "Computer Vision",
  results: "Navigated maze successfully."
)

# 6. Project Proposals (Ongoing Pitches)
proposal = ProjectProposal.create!(
  title: "Smart Campus Energy Monitor",
  sig: vidyuth,
  year: current_academic_year, # Direct INT column in project_proposals table
  duration: "4 Months",
  introduction: "Monitoring power usage across campus.",
  learning_outcomes: "IoT, Data Analysis, Hardware integration.",
  readme_md: "# Smart Campus\n\nThis project aims to reduce energy waste."
)
# Link the user to the proposal via the join table
proposal.users << webmaster_user

# 7. Events
event1 = Event.create!(
  title: "ACM Welcome Hackathon",
  description: "A 24-hour hackathon for freshmen.",
  location: "Main Seminar Hall",
  start_time: 2.days.from_now,
  end_time: 3.days.from_now,
  is_sub_event: false
)

# Register a user for the event
EventRegistration.create!(event: event1, user: convenor_user)

# 8. Blogs & Publications
tech_cat = Category.create!(name: "Technology")

blog1 = Blog.create!(
  title: "Why Ruby on Rails is perfect for React",
  subtitle: "Building APIs fast.",
  content: "Rails API mode combined with React creates a powerful, decoupled architecture...",
  author: webmaster_user,
  published_at: Time.current
)
blog1.categories << tech_cat

puts "✅ Seeding Complete! You now have test data for SIGs, Users, Core Positions, Projects, Events, and Blogs."