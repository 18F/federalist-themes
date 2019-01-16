# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "federalist-standard-theme"
  spec.version       = "0.1.0"
  spec.authors       = ["Aaron D Borden"]
  spec.email         = ["adborden@a14n.net"]

  spec.summary       = "Jekyll theme for the Federalist Standard site template."
  spec.homepage      = "https://federalist.18f.gov/"
  spec.license       = "CC0-1.0"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README)!i) } | Dir["assets/uswds/**/*", "_sass/uswds/**/*"]

  spec.add_runtime_dependency "jekyll", "~> 3.7"

  spec.add_development_dependency "bundler", "~> 1.16"
  spec.add_development_dependency "rake", "~> 12.0"
end
