const User = require("../models/user.model");

const skill_preset = [
    'Web Development',
    'Data Science',
    'Machine Learning',
    'Mobile Development',
    'Cloud Computing',
    'Cybersecurity',
    'DevOps',
    'UI/UX Design',
    'Project Management',
    'Digital Marketing',
    'Blockchain',
    'Artificial Intelligence',
    'Internet of Things',
    'Game Development',
    'Software Testing',
    'Music',
    'Photography',
    'Writing',
    'Public Speaking',
    'Leadership',
    'Time Management',
    'Critical Thinking',
    'Problem Solving',
    'Teamwork',
    'Adaptability',
    'Creativity',
    'Emotional Intelligence',
    'Networking',
    'Research',
    'Data Analysis',
    'Foreign Languages',
]

exports.getSkillPreset = (req, res) => {
    res.status(200).json({ skills: skill_preset });
};


exports.getRecommendations = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const matchedUsers = await User.find({
      _id: { $ne: currentUser._id },
      skills: { $in: currentUser.toLearn }
    }).select("username skills toLearn");

    const recommendations = matchedUsers.map(user => {
      const teachableSkills = user.skills.filter(skill =>
        currentUser.toLearn.includes(skill)
      );

      return {
        username: user.username,
        matchedSkills: teachableSkills,
        matchCount: teachableSkills.length
      };
    });

    res.status(200).json({ recommendations });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
