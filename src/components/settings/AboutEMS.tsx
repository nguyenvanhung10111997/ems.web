import Card from '../common/Card'

function AboutEMS() {
  return (
    <div className="space-y-6">
      {/* System Information */}
      <Card title="System Information">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Version</p>
              <p className="text-sm font-medium text-gray-900">1.0.0</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Build Date</p>
              <p className="text-sm font-medium text-gray-900">
                {new Date().toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Environment</p>
              <p className="text-sm font-medium text-gray-900">Production</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">License</p>
              <p className="text-sm font-medium text-gray-900">Proprietary</p>
            </div>
          </div>
        </div>
      </Card>

      {/* About */}
      <Card title="About Education Management System">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Education Management System (EMS) is a comprehensive platform
            designed for educational institutions to manage courses, students,
            teachers, and learning resources efficiently.
          </p>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900">Features:</h4>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Course Management</li>
              <li>Assignment Tracking</li>
              <li>Progress Analytics</li>
              <li>Real-time Communication</li>
              <li>Resource Library</li>
              <li>Calendar & Scheduling</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Support & Resources */}
      <Card title="Support & Resources">
        <div className="space-y-4">
          <div className="space-y-3">
            <a
              href="#"
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  📚 Documentation
                </p>
                <p className="text-xs text-gray-600">
                  User guides and API documentation
                </p>
              </div>
              <span className="text-gray-400">→</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  💬 Help Center
                </p>
                <p className="text-xs text-gray-600">
                  Get help and contact support
                </p>
              </div>
              <span className="text-gray-400">→</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  🐛 Report a Bug
                </p>
                <p className="text-xs text-gray-600">
                  Found an issue? Let us know
                </p>
              </div>
              <span className="text-gray-400">→</span>
            </a>
            <a
              href="#"
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  💡 Feature Request
                </p>
                <p className="text-xs text-gray-600">
                  Suggest new features
                </p>
              </div>
              <span className="text-gray-400">→</span>
            </a>
          </div>
        </div>
      </Card>

      {/* Legal */}
      <Card title="Legal">
        <div className="space-y-3">
          <a
            href="#"
            className="block text-sm text-sky-600 hover:text-sky-700"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="block text-sm text-sky-600 hover:text-sky-700"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="block text-sm text-sky-600 hover:text-sky-700"
          >
            Cookie Policy
          </a>
        </div>
      </Card>
    </div>
  )
}

export default AboutEMS
