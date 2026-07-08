class RepositoryIndex:
    """
    Central in-memory repository cache.
    """

    def __init__(self):
        self.clear()

    def clear(self):
        self.summary = {}
        self.tree = []
        self.files = []
        self.dependencies = {}
        self.symbols = {}
        self.call_graph = {}
        self.security_report = {}
        self.chunks = []
        self.readme = ""
        self.root = ""

    def load(
        self,
        *,
        summary,
        tree,
        files,
        dependencies,
        symbols,
        call_graph,
        security_report,
        chunks,
        readme,
        root,
    ):
        self.summary = summary
        self.tree = tree
        self.files = files
        self.dependencies = dependencies
        self.symbols = symbols
        self.call_graph = call_graph
        self.security_report = security_report
        self.chunks = chunks
        self.readme = readme
        self.root = root

    def get_summary(self):
        return self.summary

    def get_tree(self):
        return self.tree

    def get_files(self):
        return self.files

    def get_dependencies(self):
        return self.dependencies

    def get_symbols(self):
        return self.symbols

    def get_call_graph(self):
        return self.call_graph

    def get_security_report(self):
        return self.security_report

    def get_chunks(self):
        return self.chunks

    def get_readme(self):
        return self.readme

    def get_root(self):
        return self.root


repository_index = RepositoryIndex()