import { Link } from 'react-router-dom';
import { MapPin, Award, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ROUTES } from '@/utils/constants';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const PassengerHome = () => {
  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-primary-600" />,
      title: 'Real-Time Tracking',
      description: 'Track your bus in real-time with accurate location updates from the community.',
    },
    {
      icon: <Award className="h-8 w-8 text-secondary-600" />,
      title: 'Earn Rewards',
      description: 'Get points and badges for reporting bus locations and helping others.',
    },
    {
      icon: <Users className="h-8 w-8 text-primary-600" />,
      title: 'Community Powered',
      description: 'Join thousands of users making public transport better for everyone.',
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-secondary-600" />,
      title: 'ETA Predictions',
      description: 'Know exactly when your bus will arrive with AI-powered predictions.',
    },
  ];

  const stats = [
    { value: '12K+', label: 'Active Users' },
    { value: '150+', label: 'Bus Routes' },
    { value: '50K+', label: 'Reports Daily' },
    { value: '95%', label: 'Accuracy' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-display font-bold mb-6"
            >
              Never Miss Your Bus Again
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl mb-8 text-primary-100"
            >
              Track buses in real-time with community-powered updates
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/login">
                <Button size="lg" variant="secondary" icon={<MapPin />}>
                  Track Bus Now
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="bg-white text-primary-600 hover:bg-gray-100">
                  Get Started
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the future of public transportation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover padding="lg" className="h-full text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of users who never miss their bus anymore
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" icon={<ArrowRight />}>
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to never miss your bus
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Search Your Route', desc: 'Enter your bus route or destination' },
              { step: '2', title: 'Track in Real-Time', desc: 'See live bus locations on the map' },
              { step: '3', title: 'Report & Earn', desc: 'Help others and earn rewards' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PassengerHome;
