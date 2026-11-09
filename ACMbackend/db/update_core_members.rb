# ACMbackend/db/update_core_members.rb

core_members_data = [
  {
    name: "Abhishek Maruti Karennavar",
    position_name: "Webmaster",
    sub_sig: "Systems & Dev",
    sig_name: "Sanganitra",
    email: "abhimk.241it002@nitk.edu.in",
    phone: "7975643305",
    linkedin: "https://www.linkedin.com/in/abhishekmarutikarennavar",
    avatar_url: "/dpimg/abhishek_maruti_karennavar.jpg",
  },
  {
    name: "Rijul Raman",
    position_name: "Sanganitra SIG Head",
    sub_sig: "Systems & Dev",
    sig_name: "Sanganitra",
    email: "rijulraman.231it056@nitk.edu.in",
    phone: "6360898496",
    linkedin: "https://www.linkedin.com/in/rijul-raman",
    avatar_url: "/dpimg/rijul_raman.jpg",
  },
  {
    name: "Adarsh Bellamane",
    position_name: "ML Sub-SIG Head",
    sub_sig: "ML",
    sig_name: "Sanganitra",
    email: "adarsh.241it004@nitk.edu.in",
    phone: "9880541676",
    linkedin: "https://www.linkedin.com/in/adarsh-bellamane-aa0874331/",
    avatar_url: "/dpimg/adarsh_bellamane.jpg",
  },
  {
    name: "Dev Patel",
    position_name: "CP Sub-SIG Head",
    sub_sig: "CP",
    sig_name: "Sanganitra",
    email: "devpatel.241it023@nitk.edu.in",
    phone: "06355532266",
    linkedin: "https://www.linkedin.com/in/dev-patel-a40a202b7",
    avatar_url: "/dpimg/dev_patel.jpg",
  },
  {
    name: "Varun Nivass G",
    position_name: "App Master",
    sub_sig: "Systems & Dev",
    sig_name: "Sanganitra",
    email: "varunnivassg.241ai041@nitk.edu.in",
    phone: "8072884795",
    linkedin: "https://in.linkedin.com/in/varun-nivass-g-85ba90373",
    avatar_url: "/dpimg/varun_nivass_g.jpg",
  },
  {
    name: "Varshini Reddy Pateel",
    position_name: "Membership Chairperson",
    sub_sig: "Chapter Core",
    sig_name: "Sanganitra",
    email: "varshinireddy.231ai041@nitk.edu.in",
    phone: "8317326594",
    linkedin: "https://www.linkedin.com/in/varshini-reddy-pateel-311460290",
    avatar_url: "/dpimg/varshini_reddy_pateel.jpg",
  },
  {
    name: "Pratigya Vijay",
    position_name: "ACM-W Chairperson",
    sub_sig: "ACM-W",
    sig_name: "ACMW",
    email: "pratigyavijay.241it057@nitk.edu.in",
    phone: "9511336608",
    linkedin: "https://www.linkedin.com/in/pratigya-vijay-891496369",
    avatar_url: "/dpimg/pratigya_vijay.jpg",
  },
  {
    name: "Singamaneni Nikhitha Vardhan",
    position_name: "ACM-W Web Lead",
    sub_sig: "Systems & Dev",
    sig_name: "ACMW",
    email: "singamaneninikhithavardhan.241it077@nitk.edu.in",
    phone: "9100477839",
    linkedin: "https://www.linkedin.com/in/nikhitha-vardhan-singamaneni/",
    avatar_url: "/dpimg/singamaneni_nikhitha_vardhan.jpg",
  },
  {
    name: "Rohit L",
    position_name: "Vidyut SIG Head",
    sub_sig: "Leadership",
    sig_name: "Vidyut",
    email: "rohitlalu.231ec248@nitk.edu.in",
    phone: "9482962815",
    linkedin: "https://www.linkedin.com/in/rohitlalu/",
    avatar_url: "/dpimg/rohit_l.jpg",
  },
  {
    name: "Mohith M Nayaka",
    position_name: "Secretary",
    sub_sig: "Chapter Core",
    sig_name: "Vidyut",
    email: "mohith.241ec135@nitk.edu.in",
    phone: "7483295172",
    linkedin: "https://www.linkedin.com/in/mohithmnayaka",
    avatar_url: "/dpimg/mohith_m_nayaka.jpg",
  },
  {
    name: "Peddinti Ananta Venkata Seersha",
    position_name: "Analog Sub-SIG Head",
    sub_sig: "Analog",
    sig_name: "Vidyut",
    email: "seersha.241ee240@nitk.edu.in",
    phone: "897791633",
    linkedin: "https://www.linkedin.com/in/seersha-p-a-v-706a52363",
    avatar_url: "/dpimg/peddinti_ananta_venkata_seersha.jpg",
  },
  {
    name: "Rahul Prashanth",
    position_name: "Embedded Sub-SIG Head",
    sub_sig: "Embedded & IoT",
    sig_name: "Vidyut",
    email: "rahulprashanth.241ec144@nitk.edu.in",
    phone: "9035643531",
    linkedin: "https://www.linkedin.com/in/rahul-prashanth-956229313",
    avatar_url: "/dpimg/rahul_prashanth.jpg",
  },
  {
    name: "Ashish Manash",
    position_name: "Yantrika SIG Head",
    sub_sig: "Leadership",
    sig_name: "Yantrika",
    email: "ashishmanash.231ch010@nitk.edu.in",
    phone: "9142981741",
    linkedin: "https://www.linkedin.com/in/ashish-manash-abb155342/",
    avatar_url: "/dpimg/ashish_manash.jpg",
  },
  {
    name: "Rishabh Kumar Meena",
    position_name: "Yantrika Sub-SIG Head",
    sub_sig: "Robotics",
    sig_name: "Yantrika",
    email: "rishabh.241me246@nitk.edu.in",
    phone: "7405720675",
    linkedin: "https://www.linkedin.com/in/rishabh-meena-0b3b51292/",
    avatar_url: "/dpimg/rishabh_kumar_meena.jpg",
  },
  {
    name: "Akshaj Venkata Yathiraja Polisetty",
    position_name: "Saahitya SIG Head",
    sub_sig: "Literature",
    sig_name: "Saahitya",
    email: "akshajvenkatayathirajapolisetty.231cs109@nitk.edu.in",
    phone: "8904680789",
    linkedin: "https://www.linkedin.com/in/akshaj-p-v-y-030266290",
    avatar_url: "/dpimg/akshaj_venkata_yathiraja_polisetty.jpg",
  },
  {
    name: "Aryan Rahul Deshmukh",
    position_name: "Saahitya SIG Head",
    sub_sig: "Editorial & Discourse",
    sig_name: "Saahitya",
    email: "aryan.231ai006@nitk.edu.in",
    phone: "8177985688",
    linkedin: "https://www.linkedin.com/in/aryan-deshmukh-37861a289",
    avatar_url: "/dpimg/aryan_rahul_deshmukh.jpg",
  },
  {
    name: "Ghanta Bhavana Sri Sai",
    position_name: "Saahitya Sub-SIG Head",
    sub_sig: "Creative Content",
    sig_name: "Saahitya",
    email: "ghantabhavanasrisai.241it029@nitk.edu.in",
    phone: "9036093625",
    linkedin: "https://www.linkedin.com/in/bhavana-g-8246923a6",
    avatar_url: "/dpimg/ghanta_bhavana_sri_sai.jpg",
  },
  {
    name: "Varsha Geethika Bandari",
    position_name: "Saahitya Sub-SIG Head",
    sub_sig: "Publications",
    sig_name: "Saahitya",
    email: "vgbandari.241mn051@nitk.edu.in",
    phone: "9281432312",
    linkedin: "https://www.linkedin.com/in/varsha-geethika/",
    avatar_url: "/dpimg/varsha_geethika_bandari.jpg",
  },
  {
    name: "Akhil Menon",
    position_name: "Event & Publicity Coordinator (Admin Core)",
    sub_sig: "Publicity",
    sig_name: "Saahitya",
    email: "akhil.231ai005@nitk.edu.in",
    phone: "7411133038",
    linkedin: "",
    avatar_url: "/dpimg/akhil_menon.jpg",
  },
  {
    name: "Sarayu Narayanan",
    position_name: "Events & Publicity Coordinator",
    sub_sig: "Operations",
    sig_name: "Saahitya",
    email: "sarayunarayanan.231it064@nitk.edu.in",
    phone: "9741972217",
    linkedin: "https://www.linkedin.com/in/sarayu-narayanan",
    avatar_url: "/dpimg/sarayu_narayanan.jpg",
  },
  {
    name: "Jatin Aryan",
    position_name: "Kaaryavarta Sub-SIG Head",
    sub_sig: "Strategy & Ops",
    sig_name: "Kaaryavarta",
    email: "jatinaryan.241cs127@nitk.edu.in",
    phone: "7483940509",
    linkedin: "https://www.linkedin.com/in/jatinaryan/",
    avatar_url: "/dpimg/jatin_aryan.jpg",
  }
]

puts "🚀 Updating Core Positions and Members in DB..."

core_members_data.each do |item|
  sig = Sig.find_by("LOWER(name) = ?", item[:sig_name].downcase)
  unless sig
    puts "⚠️ Warning: SIG #{item[:sig_name]} not found. Creating..."
    sig = Sig.create!(name: item[:sig_name], title: "#{item[:sig_name]} SIG", description: "Official SIG")
  end

  # Find or create CorePosition with vernacular description
  pos = CorePosition.find_or_initialize_by(name: item[:position_name])
  pos.description = nil
  pos.save!

  # Sync into Member table
  member = Member.find_or_initialize_by(email: item[:email])
  member.name = item[:name]
  member.phone_no = item[:phone]
  member.linkedin = item[:linkedin].presence || nil
  member.avatar_url = item[:avatar_url]
  member.core_position = pos
  member.sig = sig
  member.sub_sig = item[:sub_sig]
  member.save!

  # Also sync into User table for authentication/portal consistency
  user = User.find_or_initialize_by(email: item[:email])
  user.name = item[:name]
  user.phone_no = item[:phone]
  user.linkedin = item[:linkedin].presence || nil
  user.avatar_url = item[:avatar_url]
  user.core_position = pos
  user.sig = sig
  user.sub_sig = item[:sub_sig]
  user.password = "password123" if user.password_digest.blank?
  user.save!

  puts "✅ Synced #{item[:name]} -> #{pos.name} (#{sig.name} [#{item[:sub_sig]}])"
end

puts "\n🎉 Total Members with Core Positions in DB: #{Member.count}"
puts "🎉 Total Users with Core Positions in DB: #{User.where.not(core_position_id: nil).count}"
