# Node.js dev environment — use with: nix flake init -t ~/projects/private/nixos-config#node
{
  description = "Node.js development environment";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";

  outputs = { nixpkgs, ... }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      devShells = forAllSystems (system:
        let pkgs = nixpkgs.legacyPackages.${system};
        in {
          default = pkgs.mkShell {
            packages = with pkgs; [
              nodejs
              nodePackages.typescript
              nodePackages.typescript-language-server
              bun
              pnpm
            ];
          };
        }
      );
    };
}
