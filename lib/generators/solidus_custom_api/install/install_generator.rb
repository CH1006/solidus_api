# frozen_string_literal: true

module SolidusCustomApi
  module Generators
    class InstallGenerator < Rails::Generators::Base
      class_option :auto_run_migrations, type: :boolean, default: false
      source_root File.expand_path('templates', __dir__)

      def copy_initializer
        template 'initializer.rb', 'config/initializers/solidus_custom_api.rb'
      end

      # def add_javascripts
      #   append_file 'vendor/assets/javascripts/spree/frontend/all.js', "//= require spree/frontend/solidus_custom_api\n"
      #   append_file 'vendor/assets/javascripts/spree/backend/all.js', "//= require spree/backend/solidus_custom_api\n"
      # end

      # def add_stylesheets
      #   inject_into_file 'vendor/assets/stylesheets/spree/frontend/all.css', " *= require spree/frontend/solidus_custom_api\n", before: %r{\*/}, verbose: true # rubocop:disable Layout/LineLength
      #   inject_into_file 'vendor/assets/stylesheets/spree/backend/all.css', " *= require spree/backend/solidus_custom_api\n", before: %r{\*/}, verbose: true # rubocop:disable Layout/LineLength
      # end

      def add_react_gem
        run 'gem add react-rails'
        append_file 'Gemfile', "\ngem \'react-rails\'"
        run 'bundle install'
      end

      def install_webpacker
        run 'bin/rails webpacker:install'
      end

      def install_react
        run 'bin/rails webpacker:install:react'
        run 'rails generate react:install'
      end

      def install_antd
        run 'yarn add antd axios @ant-design/icons konva'
        # append_file 'app/javascript/packs/application.js', "require(\"antd/dist/antd.css\")"
      end

      def copy_react_application
        template 'javascript/packs/application.js', 'app/javascript/packs/application.js'
        remove_file 'app/javascript/packs/hello_react.jsx'
      end

      def create_components
        template 'javascript/components/ProductBases.js', 'app/javascript/components/ProductBases.js'
      end
      def add_migrations
        run 'bin/rails railties:install:migrations FROM=solidus_custom_api'
      end

      def run_migrations
        run_migrations = options[:auto_run_migrations] || ['', 'y', 'Y'].include?(ask('Would you like to run the migrations now? [Y/n]')) # rubocop:disable Layout/LineLength
        if run_migrations
          run 'bin/rails db:migrate'
        else
          puts 'Skipping bin/rails db:migrate, don\'t forget to run it!' # rubocop:disable Rails/Output
        end
      end
    end
  end
end
